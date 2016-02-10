var instructorPeer = {};

Template.instructorEnterClass.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var classId = Session.get('class');

		if (Helpers.isEmpty(classId)) {
			self.subscribe(SubscriptionTag.ALL_ENROLEES);
			self.subscribe(SubscriptionTag.ALL_SECTIONS);
			classId = Helpers.getCurrentClass();
			if (Helpers.isEmpty(classId))
				FlowRouter.go('/' + Helpers.userTypeToString(Meteor.user().profile.user_type));
			else
				classId = classId._id;
		}

		self.subscribe(SubscriptionTag.PRESENCES);
		self.subscribe(SubscriptionTag.ALL_USERS);

		instructorPeer.peer = Helpers.createNewPeer();

		// This event: remote peer receives a call
		instructorPeer.peer.on('open', function () {
			console.log('peer id >> ' + instructorPeer.peer.id + '\nroom id >> ' + classId);
			// update the current user's profile
			instructorPeer.attendance.time_in = new Date();
			Meteor.call('updatePeerStatus', Meteor.userId(), { 
				_id: instructorPeer.peer.id,
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
		instructorPeer.peer.on('call', function (incomingCall) {
			instructorPeer.currentCall = incomingCall;
			incomingCall.answer(instructorPeer.localStream);
			incomingCall.on('stream', function (remoteStream) {
				instructorPeer.remoteStream = remoteStream;
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
			var video = document.getElementById('myVideo');
			video.src = URL.createObjectURL(stream);
			instructorPeer.localStream = stream;
		}, function (error) { 
			console.log(error); 
		});
	});
});

Template.instructorEnterClass.helpers
(
	{
		onlineUsers: function () {
			return Meteor.users.find({
				'status.online': true,
				'peer.room_id': Session.get('class')
			});
		}
	}
);

Template.instructorEnterClass.events
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
			var user = this;
			var outgoingCall = instructorPeer.peer.call(user.peer._id, instructorPeer.localStream);
			instructorPeer.currentCall = outgoingCall;
			outgoingCall.on('stream', function (remoteStream) {
				instructorPeer.remoteStream = remoteStream;
				alert('receiving stream...');
				var video = document.getElementById("myVideo");
				video.src = URL.createObjectURL(remoteStream);
			});
		},
		'click #leave': function (event) {
			event.preventDefault();
			if (undefined != instructorPeer.currentCall || null != instructorPeer.currentCall)
				instructorPeer.currentCall.close();
			instructorPeer.attendance.time_out = new Date();
			Meteor.call('logAttendance', Meteor.userId(), instructorPeer.attendance);
			FlowRouter.go('/instructor/current');
		}
	}
);

/*$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});*/