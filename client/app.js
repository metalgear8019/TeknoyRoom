Session.setDefault('counter', 0);

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

Template.body.events
(
	{
		'click .menu-toggle': function (event)
		{
			// event.preventDefault();
			// $("#wrapper").toggleClass("toggled");
			alert('toggle class');
		}
	}
);