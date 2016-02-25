Template.studentEnterClass.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var classId = Session.get('class');

		if (Helpers.isEmpty(classId)) {
			self.subscribe(SubscriptionTag.ALL_ENROLEES);
			self.subscribe(SubscriptionTag.ALL_SECTIONS);
			classId = Helpers.getCurrentClass();
			if (Helpers.isEmpty(classId))
				FlowRouter.go('/' + Helpers.userTypeToString(Meteor.user().profile.user_type));
			else {
				classId = classId._id;
				Session.set('class', classId);
			}
		}

		self.subscribe(SubscriptionTag.PRESENCES);
		self.subscribe(SubscriptionTag.ALL_USERS);

		PeerMedia.connections.local = Helpers.createNewPeer();
	});
});

Template.studentEnterClass.onRendered(function () {
	// This event: remote peer receives a call
	PeerMedia.connections.local.on('open', function () {
		console.log('peer id >> ' + PeerMedia.connections.local.id + '\nroom id >> ' + Session.get('class'));
		// update the current user's profile
		PeerMedia.attendance.time_in = new Date();
		Meteor.call('updatePeerStatus', Meteor.userId(), { 
			_id: PeerMedia.connections.local.id,
			room_id: Session.get('class')
		});

		// This event: remote peer receives a call
		PeerMedia.connections.local.on('call', function (incomingCall) {
			var incomingPeerId = incomingCall.peer;
			PeerMedia.connections[incomingPeerId] = incomingCall;
			incomingCall.answer(PeerMedia.streams.local);
			incomingCall.on('stream', function (remoteStream) {
				PeerMedia.streams[incomingPeerId] = remoteStream;
				var video = document.getElementById('theirVideo');
				video.src = URL.createObjectURL(remoteStream);
			});
		});

		// when student leaves the room
		// PeerMedia.connections.local.on('close', MediaHelpers.logAttendance(Meteor.userId(), Session.get('class'), PeerMedia.attendance));
	});

	MediaHelpers.requestCameraFeed(document.getElementById('myVideo'), PeerMedia);

	var self = this;
	self.autorun(function () {
		var instructor = Users.findOne({
			'peer._id': getInstructorId()
		});

		console.log('instructor >> ' + JSON.stringify(instructor));

		if (!Helpers.isEmpty(instructor)) {
			if (instructor.peer.room_id == Session.get('class')) {
				// TODO: call instructor and place stream in video DOM
				var outgoingCall = PeerMedia.connections.local.call(instructor.peer._id, PeerMedia.streams.local);
				PeerMedia.connections[instructor.peer._id] = outgoingCall;
				outgoingCall.on('stream', function (remoteStream) {
					PeerMedia.streams[instructor.peer._id] = remoteStream;
					console.log('receiving stream...');
					document.getElementById('myVideo').src = URL.createObjectURL(remoteStream);
				});
			} else if (instructor.peer.room_id == null) {
				// TODO: leave room if instructor has disconnected
				document.getElementById('myVideo').src = null;
			}
		}
	});
});

Template.studentEnterClass.helpers
(
	{
		isAvailable: function () {
			var result = getInstructorId();
			var available = result != null;
			console.log('available instructor >> ' + JSON.stringify(result));
			return available;
		},
		questionPending: function () {
			var result = isQuestionPending();
			console.log('is question pending >> ' + JSON.stringify(result));
			return (result) ? 'disabled' : '';
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
		'click #makeCall': function (event) 
		{
			event.preventDefault();
			console.log('making call...');
			var video = document.getElementById('theirVideo');
			var userPeerId = getInstructorId();
			var outgoingCall = PeerMedia.connections.local.call(userPeerId, PeerMedia.streams.local);
			PeerMedia.connections[userPeerId] = outgoingCall;
			outgoingCall.on('stream', function (remoteStream) {
				PeerMedia.streams[userPeerId] = remoteStream;
				console.log('receiving stream...');
				video.src = URL.createObjectURL(remoteStream);
			});
		},
		'click #askQuestion': function (event) 
		{
			event.preventDefault();
			Meteor.call('addRequest', getInstructorId(), PeerMedia.connections.local.id);
		},
		'click #leave': function (event) {
			event.preventDefault();
			// MediaHelpers.stopStreams(PeerMedia.streams);
			PeerMedia.streams.local.stop();
			// MediaHelpers.closeConnections(PeerMedia.connections);
			PeerMedia.connections.local.destroy();
			MediaHelpers.logAttendance(Meteor.userId(), Session.get('class'), PeerMedia.attendance);
			FlowRouter.go('/student/current');
		}
	}
);

var getInstructorId = function () {
	var result =  Users.findOne({
		'profile.user_type': 1,
		'status.online': true,
		'peer.room_id': Session.get('class')
	}) || { peer: { _id: null } };

	console.log('query done >> ');
	return result.peer._id;
};

var isQuestionPending = function () {
	var result = Users.findOne({
		'peer._id': getInstructorId()
	}) || { peer: { requests: [] } };
	var index = result.peer.requests.indexOf(PeerMedia.connections.local.id);
	return (index > -1);
}