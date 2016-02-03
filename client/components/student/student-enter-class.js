var studentPeer = {};

Template.studentEnterClass.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var classId = Session.get('class');

		self.subscribe(SubscriptionTag.PRESENCES);
		self.subscribe(SubscriptionTag.ALL_USERS);

		var peer = Helpers.createNewPeer();

		// This event: remote peer receives a call
		peer.on('open', function () {
			console.log('peer id >> ' + peer.id + '\nroom id >> ' + classId);
			// update the current user's profile
			Meteor.users.update({_id: Meteor.userId()}, {
				$set: {
					peer: { 
						_id: peer.id,
						room_id: classId
					}
				}
			});
		});

		// clear on disconnect or close
		peer.on('close', function () {
			console.log('peer id >> ' + peer.id + '\nroom id >> ' + classId);
			// update the current user's profile
			Meteor.users.update({_id: Meteor.userId()}, {
				$set: {
					peer: { 
						_id: null,
						room_id: null
					}
				}
			});
		});

		// This event: remote peer receives a call
		peer.on('call', function (incomingCall) {
			studentPeer.currentCall = incomingCall;
			incomingCall.answer(studentPeer.localStream);
			incomingCall.on('stream', function (remoteStream) {
				studentPeer.remoteStream = remoteStream;
				var video = document.getElementById("myVideo");
				video.src = URL.createObjectURL(remoteStream);
			});
		});

		navigator.getUserMedia = ( 
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia 
		);

		// get audio/video
		navigator.getUserMedia({audio:true, video: true}, function (stream) {
			//display video
			//var video = document.getElementById('myVideo');
			//video.src = URL.createObjectURL(stream);
			studentPeer.localStream = stream;
		}, function (error) { 
			console.log(error); 
		});
	});
});

Template.studentEnterClass.helpers
(
	{
		isAvailable: function () {
			var result = getInstructorId();
			console.log('available instructor >> ' + JSON.stringify(result));
			return result != null;
		}
	}
);

Template.studentEnterClass.events
(
	{
		'click #share-screen': function (event)
		{
			event.preventDefault();
			$('#share-camera').removeAttr('disabled');
			$('#share-screen').attr('disabled', 'disabled');
		},

		'click #share-camera': function (event)
		{
			event.preventDefault();
			$('#share-screen').removeAttr('disabled');
			$('#share-camera').attr('disabled', 'disabled');
		},

		'click #makeCall': function (event) {
			event.preventDefault();
			alert('making call...');
			var outgoingCall = peer.call(getInstructorId(), studentPeer.localStream);
			studentPeer.currentCall = outgoingCall;
			outgoingCall.on('stream', function (remoteStream) {
				studentPeer.remoteStream = remoteStream;
				alert('receiving stream...');
				var video = document.getElementById("myVideo");
				video.src = URL.createObjectURL(remoteStream);
			});
		},
		'click #endCall': function (event) {
			event.preventDefault();
			alert('ending call...');
			studentPeer.currentCall.close();
		}
	}
);

var getInstructorId = function () {
	var result =  Meteor.users.findOne({
		'profile.user_type': 1,
		'status.online': true,
		'peer.room_id': Session.get('class')
	}) || { peer: { _id: null } };

	console.log('query done >> ');
	return result.peer._id;
}

/*$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});*/