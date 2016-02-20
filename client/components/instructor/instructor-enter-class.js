var instructorPeer = {
	connections: {}, // key/value pairs of peer connections { [peerId]: connection }
	streams: {}, // key/value pairs of streams { [peerId]: stream }
	requests: [], // list of peer IDs who asked a question
	attendance: {} // attendance of current user, to be inserted on room leave
};

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
			else {
				classId = classId._id;
				Session.set('class', classId);
			}
		}

		self.subscribe(SubscriptionTag.PRESENCES);
		self.subscribe(SubscriptionTag.ALL_USERS);

		instructorPeer.connections['local'] = Helpers.createNewPeer();
	});
});

Template.instructorEnterClass.onRendered(function () {
	var video = document.getElementById('myVideo');

	// This event: remote peer receives a call
	instructorPeer.connections['local'].on('open', function () {
		console.log('peer id >> ' + instructorPeer.connections['local'].id + '\nroom id >> ' + Session.get('class'));
		// update the current user's profile
		instructorPeer.attendance.time_in = new Date();
		Meteor.call('updatePeerStatus', Meteor.userId(), { 
			_id: instructorPeer.connections['local'].id,
			room_id: Session.get('class')
		});

		// This event: remote peer receives a call
		instructorPeer.connections['local'].on('call', function (incomingCall) {
			var incomingPeerId = incomingCall.peer;
			instructorPeer.connections[incomingPeerId] = incomingCall;
			incomingCall.answer(instructorPeer.streams.local);
			incomingCall.on('stream', function (remoteStream) {
				instructorPeer.streams[incomingPeerId] = remoteStream;
				video.src = URL.createObjectURL(remoteStream);
			});
		});

		// when instructor leaves the room
		instructorPeer.connections['local'].on('close', function () {
			instructorPeer.attendance.time_out = new Date();
			Meteor.call('logAttendance', Meteor.userId(), instructorPeer.attendance);
			console.log('Successfully closed connection.');
		});
	});

	MediaHelpers.requestCameraFeed(video, instructorPeer);
});

Template.instructorEnterClass.helpers
(
	{
		onlineUsers: function () {
			return Users.find({
				'status.online': true,
				'peer.room_id': Session.get('class')
			});
		},
		requests: function () {
			return Users.find({
				'peer._id': { $in : instructorPeer.requests }
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
			MediaHelpers.requestScreenFeed(document.getElementById('myVideo'), instructorPeer);
		},

		'click #share-camera': function (event)
		{
			event.preventDefault();
			MediaHelpers.requestCameraFeed(document.getElementById('myVideo'), instructorPeer);
		},

		'click #makeCall': function (event) {
			event.preventDefault();
			alert('making call...');
			var userPeerId = this.peer._id;
			if (Helpers.isEmpty(userPeerId)) {
				instructorPeer.connections[userPeerId] = instructorPeer.connections['local'].call(user.peer._id, instructorPeer.streams.local);
				instructorPeer.currentCall = instructorPeer.connections[userPeerId];
				outgoingCall.on('stream', function (remoteStream) {
					instructorPeer.streams[userPeerId] = remoteStream;
					alert('receiving stream...');
					var video = document.getElementById('myVideo');
					video.src = URL.createObjectURL(remoteStream);
				});
			} else {}
		},
		'click #leave': function (event) {
			event.preventDefault();
			MediaHelpers.stopStreams(instructorPeer.streams);
			MediaHelpers.closeConnections(instructorPeer.connections);
			// if (!Helpers.isEmpty(instructorPeer.currentCall))
				// instructorPeer.currentCall.close();
			FlowRouter.go('/instructor/current');
		},
		'click #online': function (event)
		{
			event.preventDefault();
			$("#questionWrapper").hide();
			$("#onlineWrapper").show();
			//alert('online');
		},
		'click #question': function (event)
		{
			event.preventDefault();
			$("#onlineWrapper").hide();
			$("#questionWrapper").show();
			//alert('question');
		}
	}
);