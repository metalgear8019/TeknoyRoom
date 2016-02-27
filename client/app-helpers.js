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
	getRouteGroup: function (type) {
		var result = '/';
		if (type == 0)
			result = '/admin';
		else if (type == 1)
			result = '/instructor';
		else if (type == 2)
			result = '/student';
		return result;
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
			// key: '5a78de0d-b6bd-4986-9160-d74019d2fea9',  // change this key
			// path: '/',
			host: '/',
			key: 'teknoyroom',
			port: 9000,
			debug: true
			/*key: 'dqxm490i2c07ldi',
			debug: true,
			config: {'iceServers': [
				{ url: 'stun:stun01.sipphone.com' },
				{ url: 'stun:stun.ekiga.net' },
				{ url: 'stun:stun.fwdnet.net' }, 
				{ url: 'stun:stun.ideasip.com' }, 
				{ url: 'stun:stun.iptel.org' }, 
				{ url: 'stun:stun.rixtelecom.se' }, 
				{ url: 'stun:stun.schlund.de' }, 
				{ url: 'stun:stun.l.google.com:19302' }, 
				{ url: 'stun:stun1.l.google.com:19302' }, 
				{ url: 'stun:stun2.l.google.com:19302' }, 
				{ url: 'stun:stun3.l.google.com:19302' }, 
				{ url: 'stun:stun4.l.google.com:19302' }, 
				{ url: 'stun:stunserver.org' }, 
				{ url: 'stun:stun.softjoys.com' }, 
				{ url: 'stun:stun.voiparound.com' }, 
				{ url: 'stun:stun.voipbuster.com' }, 
				{ url: 'stun:stun.voipstunt.com' }, 
				{ url: 'stun:stun.voxgratia.org' }, 
				{ url: 'stun:stun.xten.com' }, 
				{ 
					url: 'turn:numb.viagenie.ca', 
					credential: 'muazkh', 
					username: 'webrtc@live.com' 
				}, 
				{ 
					url: 'turn:192.158.29.39:3478?transport=udp', 
					credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=', 
					username: '28224511:1379330808'
				}, 
				{ 
					url: 'turn:192.158.29.39:3478?transport=tcp', 
					credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=', 
					username: '28224511:1379330808'
				}
			]}*/
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
		//console.log('I do not understand.');
		var durationPast = Helpers.getDurationPast(time, currentClass.hour, currentClass.minute);
		//console.log('I do not understand. Since game man.');
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
			return result;
		} else {
			return null;
		}
	},
	getTime: function () {
		return new Date(Session.get('time'));
	}
};

PeerMedia = {
	connections: {}, // key/value pairs of peer connections { [peerId]: connection }
	streams: {}, // key/value pairs of streams { [peerId]: stream }
	attendance: {} // attendance of current user, to be inserted on room leave
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
	requestFeed: function (target, peer, audioParams, videoParams, callback) {
		MediaHelpers.requestUserMedia();
		console.log('setting user media parameters');
		navigator.getUserMedia(
			{
				audio: audioParams,
				video: videoParams
			}, function (stream) {
				target.src = URL.createObjectURL(stream);
				peer.streams.local = stream;
				if (!Helpers.isEmpty(callback))
					callback(false, stream);
			}, function (error) {
				console.log('Feed not available.\n' + error);
				if (!Helpers.isEmpty(callback))
					callback(true, error);
		});
	},
	requestScreenFeed: function(target, peer, callback) {
		$('#share-camera').removeAttr('disabled');
		$('#share-screen').attr('disabled', 'disabled');
		MediaHelpers.requestFeed(target, peer, true, {
				mozMediaSource: 'window',
				mediaSource: 'window'
		}, callback);
	},
	requestCameraFeed: function(target, peer, callback) {
		$('#share-screen').removeAttr('disabled');
		$('#share-camera').attr('disabled', 'disabled');
		MediaHelpers.requestFeed(target, peer, true, true, callback);
	},
	stopStreams: function(streams) {
		if (!Helpers.isEmpty(streams)) {
			for (streamId in streams) {
				if (!streams.hasOwnProperty(streamId))
					continue;
				if (!Helpers.isEmpty(streamId))
					streams[streamId].stop();
			}
		}
	},
	closeConnections: function(connections) {
		if (!Helpers.isEmpty(connections)) {
			for (connId in connections) {
				if (!connections.hasOwnProperty(connId))
					continue;
				if (!Helpers.isEmpty(connId))
					connections[connId].destroy();
			}
		}
	},
	logAttendance: function (userId, sectionId, attendance) {
		attendance.time_out = new Date();
		Meteor.call('logAttendance', userId, sectionId, attendance);
		console.log('Successfully closed connection.');
	}
};