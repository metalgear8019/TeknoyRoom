var studentPeer = {
	connections: {}, // key/value pairs of peer connections { [peerId]: connection }
	streams: {}, // key/value pairs of streams { [peerId]: stream }
	attendance: {} // attendance of current user, to be inserted on room leave
};

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

		studentPeer.connections['local'] = Helpers.createNewPeer();
	});
});

Template.studentEnterClass.onRendered(function () {
	// This event: remote peer receives a call
	studentPeer.connections['local'].on('open', function () {
		console.log('peer id >> ' + studentPeer.connections['local'].id + '\nroom id >> ' + Session.get('class'));
		// update the current user's profile
		studentPeer.attendance.time_in = new Date();
		Meteor.call('updatePeerStatus', Meteor.userId(), { 
			_id: studentPeer.connections['local'].id,
			room_id: Session.get('class')
		});

		// This event: remote peer receives a call
		studentPeer.connections['local'].on('call', function (incomingCall) {
			var incomingPeerId = incomingCall.peer;
			studentPeer.connections[incomingPeerId] = incomingCall;
			incomingCall.answer(studentPeer.streams.local);
			incomingCall.on('stream', function (remoteStream) {
				studentPeer.streams[incomingPeerId] = remoteStream;
				var video = document.getElementById('theirVideo');
				video.src = URL.createObjectURL(remoteStream);
			});
		});

		// when student leaves the room
		studentPeer.connections['local'].on('close', function () {
			studentPeer.attendance.time_out = new Date();
			Meteor.call('logAttendance', Meteor.userId(), studentPeer.attendance);
			console.log('Successfully closed connection.');
		});
	});

	MediaHelpers.requestCameraFeed(document.getElementById('myVideo'), studentPeer);
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
			var outgoingCall = studentPeer.connections['local'].call(userPeerId, studentPeer.streams.local);
			studentPeer.connections[userPeerId] = outgoingCall;
			outgoingCall.on('stream', function (remoteStream) {
				studentPeer.streams[userPeerId] = remoteStream;
				// alert('receiving stream...');
				video.src = URL.createObjectURL(remoteStream);
			});
		},
		'click #askQuestion': function (event) 
		{
			event.preventDefault();
			Meteor.call('addRequest', getInstructorId(), studentPeer.connections['local'].peer);
		},
		'click #leave': function (event) 
		{
			event.preventDefault();
			//$('video').src = null;
			MediaHelpers.stopStreams(studentPeer.streams);
			MediaHelpers.closeConnections(studentPeer.connections);
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