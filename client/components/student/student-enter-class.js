var studentPeer = {
	attendance: {}
};

Template.studentEnterClass.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var classId = Session.get('class');

		self.subscribe(SubscriptionTag.PRESENCES);
		self.subscribe(SubscriptionTag.ALL_USERS);

		studentPeer.peer = Helpers.createNewPeer();

		// This event: remote peer receives a call
		studentPeer.peer.on('open', function () {
			console.log('peer id >> ' + studentPeer.peer.id + '\nroom id >> ' + classId);
			// update the current user's profile
			studentPeer.attendance.time_in = new Date();
			Meteor.call('updatePeerStatus', Meteor.userId(), { 
				_id: studentPeer.peer.id,
				room_id: classId
			});
		});

		// clear on disconnect or close
		/*peer.on('close', function () {
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
		});*/

		// This event: remote peer receives a call
		studentPeer.peer.on('call', function (incomingCall) {
			studentPeer.currentCall = incomingCall;
			incomingCall.answer(studentPeer.localStream);
			incomingCall.on('stream', function (remoteStream) {
				studentPeer.remoteStream = remoteStream;
				var video = document.getElementById("theirVideo");
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
			var video = document.getElementById('myVideo');
			video.src = URL.createObjectURL(stream);
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
			var outgoingCall = studentPeer.peer.call(getInstructorId(), studentPeer.localStream);
			studentPeer.currentCall = outgoingCall;
			outgoingCall.on('stream', function (remoteStream) {
				studentPeer.remoteStream = remoteStream;
				alert('receiving stream...');
				var video = document.getElementById("theirVideo");
				video.src = URL.createObjectURL(remoteStream);
			});
		},
		'click #leave': function (event) {
			event.preventDefault();
			if (undefined != studentPeer.currentCall || null != studentPeer.currentCall)
				studentPeer.currentCall.close();
			studentPeer.attendance.time_out = new Date();
			Meteor.call('logAttendance', Meteor.userId(), studentPeer.attendance);
			FlowRouter.go('/student/current');
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