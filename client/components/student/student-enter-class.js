var note;

Template.studentEnterClass.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var classId = Session.get('class');
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
		
		if (Helpers.isEmpty(classId)) {
			self.subscribe(SubscriptionTag.ALL_SECTIONS);
			classId = Helpers.getCurrentClass();
			if (Helpers.isEmpty(classId))
				FlowRouter.go('/' + Helpers.userTypeToString(Meteor.user().profile.user_type));
			else {
				classId = classId._id;
				Session.set('class', classId);
				Session.set('course', classId.course);
			}
		}

		self.subscribe(SubscriptionTag.PRESENCES);
		self.subscribe(SubscriptionTag.CURRENT_NOTE, Meteor.userId(), Session.get('course'));

		Session.set('note', Notes.findOne());

		PeerMedia.connections.local = Helpers.createNewPeer();
	});
});

Template.studentEnterClass.onRendered(function () {
	var video = document.getElementById('theirVideo');

	// This event: remote peer receives a call
	PeerMedia.connections.local.on('open', function () {
		console.log('peer id >> ' + PeerMedia.connections.local.id + '\nroom id >> ' + Session.get('class'));
		// update the current user's profile
		PeerMedia.attendance.time_in = new Date();

		// This event: remote peer receives a call
		PeerMedia.connections.local.on('call', function (incomingCall) {
			var incomingPeerId = incomingCall.peer;
			PeerMedia.connections[incomingPeerId] = incomingCall;
			incomingCall.answer(PeerMedia.streams.local);
			incomingCall.on('stream', function (remoteStream) {
				PeerMedia.streams[incomingPeerId] = remoteStream;
				video.src = URL.createObjectURL(remoteStream);
			});
		});

		// when student leaves the room
		// PeerMedia.connections.local.on('close', MediaHelpers.logAttendance(Meteor.userId(), Session.get('class'), PeerMedia.attendance));
	});

	MediaHelpers.requestCameraFeed(document.getElementById('myVideo'), PeerMedia, function (hasError, data) {
		if (hasError) {
			console.log('Request feed error!\n' + data);
		} else {
			Meteor.call('updatePeerStatus', Meteor.userId(), { 
				_id: PeerMedia.connections.local.id,
				room_id: Session.get('class')
			});
		}
	});
});

Template.studentEnterClass.helpers
(
	{
		autocall: function () {
			var instructorId = getInstructorId();
			console.log('instructor id >> ' + instructorId);
			var video = document.getElementById('theirVideo');
			if (instructorId != null && !Helpers.isEmpty(video)) {
				var instructor = Users.findOne({
					'peer._id': instructorId
				});

				console.log('instructor >> ' + JSON.stringify(instructor));

				if (instructor.peer.room_id == Session.get('class')) {
					// TODO: call instructor and place stream in video DOM
					var outgoingCall = PeerMedia.connections.local.call(instructor.peer._id, PeerMedia.streams.local);
					PeerMedia.connections[instructor.peer._id] = outgoingCall;
					outgoingCall.on('stream', function (remoteStream) {
						PeerMedia.streams[instructor.peer._id] = remoteStream;
						console.log('receiving stream...');
						video.src = URL.createObjectURL(remoteStream);
					});
				} else if (instructor.peer.room_id == null) {
					// TODO: leave room if instructor has disconnected
					video.src = null;
				}
			}
			return '';
		},
		isAvailable: function () {
			var result = getInstructorId();
			var available = result != null;
			console.log('available instructor >> ' + JSON.stringify(result));
			return available;
		},
		note: function () {
			return Session.get('note');
		},
		questionPending: function () {
			var result = isQuestionPending();
			console.log('is question pending >> ' + result);
			return (result) ? 'disabled' : '';
		}
	}
);

Template.studentEnterClass.events
(
	{
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
			var note = Session.get('note');
			note.content = document.getElementById('textArea').value;
			Meteor.call('updateNote', note._id, note);
			PeerMedia.streams.local.stop();
			PeerMedia.connections.local.destroy();
			
			var enrollee = Enrollees.findOne({'user':Meteor.userId(), 'section': Session.get('class')});
			var isAlreadyLog = false;

			for (var i = 0; i < enrollee.attendance.length; i++)
			{
				if (PeerMedia.attendance.time_in.toDateString() == enrollee.attendance[i].time_in.toDateString())
				{
					isAlreadyLog = true;
				}
			}			

			if (!isAlreadyLog)
			{
				MediaHelpers.logAttendance(Meteor.userId(), Session.get('class'), PeerMedia.attendance);
			}
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
	var instructorId = getInstructorId();
	var result = { peer: { requests: [] } };
	if (!Helpers.isEmpty(instructorId)) {
		result = Users.findOne({
			'peer._id': instructorId
		});
	}
	var index = result.peer.requests.indexOf(PeerMedia.connections.local.id);
	return (index > -1);
}