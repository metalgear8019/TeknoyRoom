Helpers = {
	isEmpty: function (variable) {
		var empty = false;
		if (variable === null ||
			variable === undefined ||
			variable === [] ||
			variable === {} ||
			variable === '')
				empty = true;
		return empty;
	},
	generateRedirectRoute: function (splitPath, userType) {
		var route = '/' + userType;
		if (!Helpers.isEmpty(splitPath) && splitPath[1] === userType) {
			for (i = 2; i < splitPath.length; i++)
				route += '/' + splitPath[i];
		}
		return route;
	},
	userTypeToString: function (userType) {
		var result = '';
		switch (userType) {
			case 0: result = Role.Group.ADMIN; break;
			case 1: result = Role.Group.INSTRUCTOR; break;
			case 2: result = Role.Group.STUDENT; break;
			default: result = Role.Group.GUEST; break;
		}
	},
	dayToString: function (days) {
		var result = '';
		days.forEach(function (value) {
			value += '';
			switch (value) {
				case '1': result += 'Sun'; break;
				case '2': result += 'M'; break;
				case '3': result += 'T'; break;
				case '4': result += 'W'; break;
				case '5': result += 'Th'; break;
				case '6': result += 'F'; break;
				case '7': result += 'Sat'; break;
			}
		});
		return result;
	},
	dateToString: function (date) {
		return date.getMonth() + '/' + date.getDay() + '/' + date.getYear();
	},
	timeToString: function (hour, minute, offset) {
		var period = 'AM';

		hour = parseInt(hour + offset / 60);
		minute = parseInt(minute) + parseInt(offset) % 60;

		if (hour > 12) {
			period = 'PM';
			hour -= 12;
		}

		if (minute >= 60) {
			minute -= 60;
			hour++;
		}

		if (minute < 10) {
			minute = '0' + minute;
		}

		var str = hour + ':' + minute + ' ' + period;
		return str;
	},
	scheduleToString: function (schedule) {
		var result = Helpers.dayToString(schedule.day);
		result += ' ' + Helpers.timeToString(schedule.hour, schedule.minute, 0) + ' - ' +
			Helpers.timeToString(schedule.hour, schedule.minute, schedule.duration);
		return result;
	},
	getDurationPast: function (time, hour, minute) {
		var duration = (time.getHours() - hour) * 60;
		duration += time.getMinutes() - minute;
		return duration;
	},
	createNewPeer: function() {
		return new Peer({
			key: '5a78de0d-b6bd-4986-9160-d74019d2fea9',  // change this key
			debug: 3,
			config: {'iceServers': [
				/*{ url: 'stun:stun.l.google.com:19302' },
				{ url: 'stun:stun1.l.google.com:19302' },
				{ url: 'stun:stun2.l.google.com:19302' },
				{ url: 'stun:stun3.l.google.com:19302' },
				{ url: 'stun:stun4.l.google.com:19302' },*/
				{ url: 'stun:stun.skyway.io.com:3478' },
				{
					url: 'turn:homeo@turn.bistri.com:80',
					credential: 'homeo'
				}/*,
				{
					url: 'turn:numb.viagenie.ca',
					credential: 'muazkh',
					username: 'webrtc@live.com'
				}*/
			]}
		});
	},
	getCurrentSemester: function () {
		var time = new Date(Session.get('time'));
		var result = Semesters.findOne({
			start_date: { $lte: time },
			end_date: { $gte: time }
		}) || {};
		return result;
	},
	isClassOngoing: function (currentClass, time) {
		if (!(time instanceof Date) || Helpers.isEmpty(currentClass))
			return false;
		var currentDay = time.getDay() + 1;
		var currentHour = time.getHours();
		var durationPast = Helpers.getDurationPast(time, currentClass.hour, currentClass.minute);
		return (currentClass.day.includes(currentDay) && currentHour >= currentClass.hour &&
			durationPast < currentClass.duration);
	},
	getCurrentClass: function () {
		var time = new Date(Session.get('time'));
		var enrolledSubjects = Enrollees.find({ user: Meteor.userId() });
	 	var enrolledIds = enrolledSubjects.map(function (c) { return c.section; });
	 	var semesterId = Helpers.getCurrentSemester()._id;
		var result = Sections.findOne({
			_id: { $in: enrolledIds },
			day: ( time.getDay() + 1 ),
			hour: { $lte: time.getHours() },
			semester: semesterId
		}, { sort: { hour: -1, minute: -1 }});
		
		console.log("class >> " + JSON.stringify(result) + '\nday >> ' + time.getDay() + '\nhour >> ' + time.getHours());

		if (Helpers.isClassOngoing(result, time)) {
			console.log("duration >> " + result.duration + "\ntime passed >> " + 
				Helpers.getDurationPast(time, result.hour, result.minute));
			// Session.set('class', result._id);
			// console.log('enrolled id >> ' + Session.get('class'));
			// FlowRouter.go(getRouteGroup() + '/current/enter');
			return result;
		} else {
			// alert('No classes currently held.');
			return null;
		}
	},
	getTime: function () {
		return new Date(Session.get('time'));
	}
};

MediaHelpers = {
	requestUserMedia: function() {
		console.log('getting user media');
		navigator.getUserMedia = (
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia ||
			navigator.getUserMedia
		);
	},
	requestFeed: function (target, peer, audioParams, videoParams) {
		MediaHelpers.requestUserMedia();
		console.log('setting user media parameters');
		navigator.getUserMedia(
			{
				audio: audioParams,
				video: videoParams
			}, function (stream) {
				target.src = URL.createObjectURL(stream);
				peer.streams.local = stream;
			}, function (error) {
				console.log('Feed not available.\n' + error);
		});
	},
	requestScreenFeed: function(target, peer) {
		$('#share-camera').removeAttr('disabled');
		$('#share-screen').attr('disabled', 'disabled');
		MediaHelpers.requestFeed(target, peer, true, {
				mozMediaSource: 'window',
				mediaSource: 'window'
		});
	},
	requestCameraFeed: function(target, peer) {
		$('#share-screen').removeAttr('disabled');
		$('#share-camera').attr('disabled', 'disabled');
		MediaHelpers.requestFeed(target, peer, true, true);
	},
	stopStreams: function(streams) {
		for (streamId in streams) {
			if (!streams.hasOwnProperty(streamId))
				continue;
			if (!Helpers.isEmpty(streamId))
				streams[streamId].stop();
		}
	},
	closeConnections: function(connections) {
		for (connId in connections) {
			if (!connections.hasOwnProperty(connId))
				continue;
			if (!Helpers.isEmpty(connId))
				connections[connId].destroy();
		}
	}
};