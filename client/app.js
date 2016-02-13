Session.setDefault('counter', 0);

// sync client clock with server time with an interval
setInterval(function () {
	Meteor.call('getServerTime', function (error, result) {
		Session.set('time', result);
	});
}, 1000);

// redirect on login
Accounts.onLogin(function() {
	var route;
	var currentPath = FlowRouter.current().path;
	var user = Users.findOne(Meteor.userId());
	console.log('path >> ' + currentPath + '\nuser >> ' + JSON.stringify(user));
	splitPath = currentPath.split('/');
	switch (user.profile.user_type) {
		case 0: route = Helpers.generateRedirectRoute(splitPath, 'admin'); break;
		case 1: route = Helpers.generateRedirectRoute(splitPath, 'instructor'); break;
		case 2: route = Helpers.generateRedirectRoute(splitPath, 'student'); break;
		default: route = '/login'
	}
	FlowRouter.go(route);
});

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
			key: 'dqxm490i2c07ldi',  // change this key
			debug: 3,
			config: {'iceServers': [
				{ url: 'stun:stun.l.google.com:19302' },
				{ url: 'stun:stun1.l.google.com:19302' },
				{ url: 'stun:stun2.l.google.com:19302' },
				{ url: 'stun:stun3.l.google.com:19302' },
				{ url: 'stun:stun4.l.google.com:19302' },
				{
					url: 'turn:numb.viagenie.ca',
					credential: 'muazkh',
					username: 'webrtc@live.com'
				}
			]}
		});
	},
	getCurrentClass: function () {
		var time = new Date(Session.get('time'));
		var enrolledSubjects = Enrollees.find({ user: Meteor.userId() });
	 	var enrolledIds = enrolledSubjects.map(function (c) { return c.section; });
		var result = Sections.findOne({
			_id: { $in: enrolledIds },
			day: ( time.getDay() + 1 ),
			hour: { $lte: time.getHours() }
		}, { sort: { hour: -1, minute: -1 }});
		
		console.log("class >> " + JSON.stringify(result) + '\nday >> ' + time.getDay() + '\nhour >> ' + time.getHours());

		if (result != null && result != undefined && 
				Helpers.getDurationPast(time, result.hour, result.minute) < result.duration) {
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

hotKey = new Hotkeys({
	autoLoad : false
});

//for the sidebar parts
hotKey.add({

	combo : "shift+q",
	callback : function()
	{
		FlowRouter.go("/admin/user/new");
	}
})

hotKey.add({
	combo : "shift+w",
	callback : function()
	{
		FlowRouter.go("/admin/user/");
	}
})

hotKey.add({
	combo : "shift+f",
	callback : function()
	{
		FlowRouter.go("/admin/section/new");
	}
})

hotKey.add({
	combo : "shift+p",
	callback : function()
	{
		FlowRouter.go("/admin/section");
	}
})

hotKey.add({
	combo : "shift+g",
	callback : function()
	{
		FlowRouter.go("/admin/section/enroll");
	}
})

hotKey.add({
	combo : "shift+j",
	callback : function()
	{
		FlowRouter.go("/admin/course/new");
	}
})

hotKey.add({
	combo : "shift+l",
	callback : function()
	{
		FlowRouter.go("/admin/course/");
	}
})

hotKey.add({
	combo : "shift+u",
	callback : function()
	{
		FlowRouter.go("/admin/semester/new");
	}
})

hotKey.add({
	combo : "shift+y",
	callback : function()
	{
		FlowRouter.go("/admin/semester/");
	}
})

hotKey.add({
	combo : "shift+m",
	callback : function()
	{
		console.log("shift+m was pressed");
	}
})


Template.registerHelper
(
	'equals', function (a, b)
	{
		return a == b;
	}
);

Template.registerHelper
(
	'not', function (a)
	{
		return !a;
	}
);

Template.registerHelper
(
	'notEquals', function (a, b)
	{
		return a != b;
	}
);

Template.registerHelper
(
	'greaterThan', function (a, b)
	{
		return a > b;
	}
);

Template.registerHelper
(
	'minusTwelve', function (a)
	{
		return parseInt(a) - 12;
	}
);

Template.registerHelper
(
	'computeTimeEndHour', function (start_hour, duration)
	{
		var end_hour = start_hour + parseInt(duration/60);

		/*if (end_hour > 12)
		{
			end_hour =- 12;
		}*/

		return end_hour;
	}
);

Template.registerHelper
(
	'computeTimeEndMinute', function (start_minute, duration)
	{
		var end_minute = start_minute - (duration%60);

		if (end_minute < 0)
		{
			end_minute += 60;
		}

		if (end_minute == 0)
		{
			end_minute += '0';
		}

		return end_minute;
	}
);

Template.registerHelper
(
	'currentPage', function()
	{
		var routeName = FlowRouter.getRouteName();
		console.log(routeName);
		return routeName;
	}
);
