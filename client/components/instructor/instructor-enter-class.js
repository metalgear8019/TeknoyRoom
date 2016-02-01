Template.instructorEnterClass.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.PRESENCES);
		self.subscribe(SubscriptionTag.ALL_USERS);

		window.peer = Helpers.createNewPeer();

		// This event: remote peer receives a call
		peer.on('open', function () {
			$('#myPeerId').text(peer.id);
			// update the current user's profile
			Meteor.users.update({_id: Meteor.userId()}, {
				$set: {
					peer: { _id: peer.id }
				}
			});
		});

		// This event: remote peer receives a call
		peer.on('call', function (incomingCall) {
			window.currentCall = incomingCall;
			incomingCall.answer(window.localStream);
			incomingCall.on('stream', function (remoteStream) {
				window.remoteStream = remoteStream;
				var video = document.getElementById("myVideo")
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
			window.localStream = stream;
		}, function (error) { 
			console.log(error); 
		});
	});
});

Template.instructorEnterClass.helpers
(
	{
		onlineUsers: function () {
			return Meteor.users.find({ 'status.online': true });
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
			var outgoingCall = peer.call(user.profile.peerId, window.localStream);
			window.currentCall = outgoingCall;
			outgoingCall.on('stream', function (remoteStream) {
				window.remoteStream = remoteStream;
				alert('receiving stream...');
				var video = document.getElementById("myVideo")
				video.src = URL.createObjectURL(remoteStream);
			});
		},
		'click #endCall': function (event) {
			event.preventDefault();
			alert('ending call...');
			window.currentCall.close();
		}
	}
);

/*$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});*/