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
	var currentPath = FlowRouter.current().path || '';
	var user = Users.findOne(Meteor.userId()) || { profile: { user_type: -1 } };
	console.log('path >> ' + currentPath + '\nuser >> ' + JSON.stringify(user));
	splitPath = currentPath.split('/');
	switch (user.profile.user_type) {
		case 0: route = Helpers.generateRedirectRoute(splitPath, 'admin'); break;
		case 1: route = Helpers.generateRedirectRoute(splitPath, 'instructor'); break;
		case 2: route = Helpers.generateRedirectRoute(splitPath, 'student'); break;
		default: route = '/'
	}
	FlowRouter.go(route);
});

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
