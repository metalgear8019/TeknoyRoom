Session.setDefault('counter', 0);

hotKey = new Hotkeys();

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

		return end_minute;
	}
);

/*Template.body.events
(
	{
		'keypress #body': function (event)
		{
			event.preventDefault();
			console.log("hey");
		}
	}
);*/