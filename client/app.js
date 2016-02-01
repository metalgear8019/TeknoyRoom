Session.setDefault('counter', 0);

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
		/*var routeId = FlowRouter.getParam('id');
		//console.log(routeName);
		if (routeId != undefined)
		{
			routeName += '/' + routeId;	
		}*/
		console.log(routeName);
		return routeName;
	}
);

/*

$("div").click(function (e) {
  
  // Remove any old one
  $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight =  $(this).height();
  
  // Add the element
  $(this).prepend("<span class='ripple'></span>");

  
 // Make it round!
  if(buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight; 
  }
  
  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;
  
 
  // Add the ripples CSS and start the animation
  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
});


Template.body.events
(
	{

		'click .btn-splash': function (event)
		{
			event.preventDefault();
			console.log("hey");
			// Remove any old one
			  $(".ripple").remove();

			  // Setup
			  var posX = $(this).offset().left,
			      posY = $(this).offset().top,
			      buttonWidth = $(this).width(),
			      buttonHeight =  $(this).height();
			  
			  // Add the element
			  $(this).prepend("<span class='ripple'></span>");

			  
			 // Make it round!
			  if(buttonWidth >= buttonHeight) {
			    buttonHeight = buttonWidth;
			  } else {
			    buttonWidth = buttonHeight; 
			  }
			  
			  // Get the center of the element
			  var x = e.pageX - posX - buttonWidth / 2;
			  var y = e.pageY - posY - buttonHeight / 2;
			  
			 
			  // Add the ripples CSS and start the animation
			  $(".ripple").css({
			    width: buttonWidth,
			    height: buttonHeight,
			    top: y + 'px',
			    left: x + 'px'
			  }).addClass("rippleEffect");

		}
	}
);

/*$(document).ready(function(ev) {
  var toggle = $('#ss_toggle');
  var menu = $('#ss_menu');
  var rot;
  console.log("hey 1");
  
  $('#ss_toggle').on('click', function(ev) {
    rot = parseInt($(this).data('rot')) - 180;
    menu.css('transform', 'rotate(' + rot + 'deg)');
    menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
    if ((rot / 180) % 2 == 0) {
      //Moving in
      toggle.parent().addClass('ss_active');
      toggle.addClass('close');
    } else {
      //Moving Out
      toggle.parent().removeClass('ss_active');
      toggle.removeClass('close');
    }
    console.log("hey 2");
    $(this).data('rot', rot);
  });

  menu.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
  	console.log("hey 3");
    if ((rot / 180) % 2 == 0) {
      $('#ss_menu div i').addClass('ss_animate');
    } else {
      $('#ss_menu div i').removeClass('ss_animate');
    }
  });
  
});*/

