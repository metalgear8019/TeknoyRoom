Template.userSidebar.events
(
	{
		'click #menu-toggle': function (event)
		{
			event.preventDefault();
			$("#wrapper").toggleClass("active");
		}
	}
);

Template.userSidebar.helpers
(
	{
		name: function() {
			var result = Meteor.user();
			return result.profile.first_name.toUpperCase() + ' ' + result.profile.last_name.toUpperCase();
		},
		image: function()
		{
			var result = Meteor.user();
			var source;
			if(result.profile.image != null)
			{
				source = result.profile.image;
			}
			else
			{
				if (result.profile.gender == 'Male')
					source = "/assets/profile-picture3.png";
				else
					source = "/assets/profile-picture2.png";
			}
			return source;
		},
		links: function () {
			var routeGroup = Helpers.getRouteGroup(Meteor.user().profile.user_type);
			var currentPath = FlowRouter.current().path.split('/');
			var list = [
				{
					link: routeGroup + '/profile',
					icon: 'sub_icon fa fa-user',
					label: 'PROFILE',
					selected: currentPath[1] == 'profile'
				},
				{
					link: routeGroup + '/current',
					icon: 'sub_icon fa fa-angle-double-right',
					label: 'CURRENT COURSES',
					selected: currentPath[1] == 'current'
				},
				{
					link: routeGroup + '/previous',
					icon: 'sub_icon fa fa-angle-double-left',
					label: 'PREVIOUS COURSES',
					selected: currentPath[1] == 'previous'
				}
			];
			console.log('list' + JSON.stringify(list));
			return list;
		}
	}
);