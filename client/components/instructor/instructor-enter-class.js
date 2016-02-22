/*var Requests = {
	list: [], // list of students who asked questions
	get: function () {
		if (!this.dependency) {
			this.dependency = new Tracker.Dependency();
		}
		this.dependency.depend();
		return this.list;
	},
	add: function (peerId) {
		var index = this.list.indexOf(peerId);
		if (index < 0) {
			this.list.push(peerId);
			this.dependency.changed();
		}
	},
	remove: function (peerId) {
		var index = this.list.indexOf(peerId);
		if (index > -1) {
			this.list.splice();
			this.dependency.changed();
		}
	},
	reset: function () {
		this.list = [];
		this.dependency.changed();
	}
}*/

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

		PeerMedia.connections['local'] = Helpers.createNewPeer();
	});
});

Template.instructorEnterClass.onRendered(function () {
	var video = document.getElementById('myVideo');

	// This event: remote peer receives a call
	PeerMedia.connections['local'].on('open', function () {
		console.log('peer id >> ' + PeerMedia.connections['local'].id + '\nroom id >> ' + Session.get('class'));
		// update the current user's profile
		PeerMedia.attendance.time_in = new Date();
		Meteor.call('updatePeerStatus', Meteor.userId(), { 
			_id: PeerMedia.connections['local'].id,
			room_id: Session.get('class')
		});

		// This event: remote peer receives a call
		PeerMedia.connections['local'].on('call', function (incomingCall) {
			var incomingPeerId = incomingCall.peer;
			PeerMedia.connections[incomingPeerId] = incomingCall;
			incomingCall.answer(PeerMedia.streams.local);
			incomingCall.on('stream', function (remoteStream) {
				PeerMedia.streams[incomingPeerId] = remoteStream;
				video.src = URL.createObjectURL(remoteStream);
			});
		});

		// when instructor leaves the room
		PeerMedia.connections['local'].on('close', function () {
			PeerMedia.attendance.time_out = new Date();
			Meteor.call('logAttendance', Meteor.userId(), PeerMedia.attendance);
			console.log('Successfully closed connection.');
		});
	});

	MediaHelpers.requestCameraFeed(video, PeerMedia);
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
			var requestIds = Users.findOne({ _id: Meteor.userId() }).peer.requests || [];
			return Users.find({
				'peer._id': { $in : requestIds }
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
			MediaHelpers.requestScreenFeed(document.getElementById('myVideo'), PeerMedia);
		},

		'click #share-camera': function (event)
		{
			event.preventDefault();
			MediaHelpers.requestCameraFeed(document.getElementById('myVideo'), PeerMedia);
		},
		'click #makeCall': function (event) {
			event.preventDefault();
			alert('making call...');
			var video = document.getElementById('myVideo');
			var userPeerId = this.peer._id;
			if (Helpers.isEmpty(PeerMedia.streams[userPeerId])) {
				PeerMedia.connections[userPeerId] = PeerMedia.connections['local'].call(user.peer._id, PeerMedia.streams.local);
				PeerMedia.connections[userPeerId].on('stream', function (remoteStream) {
					PeerMedia.streams[userPeerId] = remoteStream;
					alert('receiving stream...');
					video.src = URL.createObjectURL(remoteStream);
				});
			} else {
				video.src = URL.createObjectURL(PeerMedia.streams[userPeerId]);
			}
		},
		'click #answerQuestion': function (event) {
			event.preventDefault();
			// alert('making call...');
			var video = document.getElementById('myVideo');
			var userPeerId = this.peer._id;
			if (Helpers.isEmpty(PeerMedia.streams[userPeerId])) {
				PeerMedia.connections[userPeerId] = PeerMedia.connections['local'].call(user.peer._id, PeerMedia.streams.local);
				PeerMedia.connections[userPeerId].on('stream', function (remoteStream) {
					PeerMedia.streams[userPeerId] = remoteStream;
					alert('receiving stream...');
					video.src = URL.createObjectURL(remoteStream);
				});
			} else {
				video.src = URL.createObjectURL(PeerMedia.streams[userPeerId]);
			}
		},
		'click #endQuestion': function (event) 
		{
			event.preventDefault();
			var userPeerId = this.peer._id;
			Meteor.call('removeRequest', PeerMedia.connections['local'].id, userPeerId);
		},
		'click #leave': function (event) {
			event.preventDefault();
			MediaHelpers.stopStreams(PeerMedia.streams);
			MediaHelpers.closeConnections(PeerMedia.connections);
			FlowRouter.go('/instructor/current');
		},
		'click #online': function (event)
		{
			event.preventDefault();
			$("#questionWrapper").hide();
			$("#onlineWrapper").show();
		},
		'click #question': function (event)
		{
			event.preventDefault();
			$("#onlineWrapper").hide();
			$("#questionWrapper").show();
		}
	}
);