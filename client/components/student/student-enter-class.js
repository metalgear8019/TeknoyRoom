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

		PeerMedia.connections['local'] = Helpers.createNewPeer();
	});
});

Template.studentEnterClass.onRendered(function () {
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
				var video = document.getElementById('theirVideo');
				video.src = URL.createObjectURL(remoteStream);
			});
		});

		// when student leaves the room
		PeerMedia.connections['local'].on('close', function () {
			PeerMedia.attendance.time_out = new Date();
			Meteor.call('logAttendance', Meteor.userId(), PeerMedia.attendance);
			console.log('Successfully closed connection.');
		});
	});

	MediaHelpers.requestCameraFeed(document.getElementById('myVideo'), PeerMedia);
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
		'click #makeCall': function (event) 
		{
			event.preventDefault();
			// alert('making call...');
			var video = document.getElementById('theirVideo');
			var userPeerId = getInstructorId();
			var outgoingCall = PeerMedia.connections['local'].call(userPeerId, PeerMedia.streams.local);
			PeerMedia.connections[userPeerId] = outgoingCall;
			outgoingCall.on('stream', function (remoteStream) {
				PeerMedia.streams[userPeerId] = remoteStream;
				// alert('receiving stream...');
				video.src = URL.createObjectURL(remoteStream);
			});
		},
		'click #askQuestion': function (event) 
		{
			event.preventDefault();
			Meteor.call('addRequest', getInstructorId(), PeerMedia.connections['local'].id);
		},
		'click #leave': function (event) 
		{
			event.preventDefault();
			MediaHelpers.stopStreams(PeerMedia.streams);
			MediaHelpers.closeConnections(PeerMedia.connections);
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