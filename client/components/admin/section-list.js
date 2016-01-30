hotKey = new Hotkeys({
	autoLoad : true
});

hotKey.add({
	combo : "shift+m",
	callback : function()
	{
		$("#filled-in-box1").attr("checked", true);
	}
})


hotKey.add({
	combo : "shift+t",
	callback : function()
	{
		$("#filled-in-box2").attr("checked", true);
	}
})

hotKey.add({
	combo : "shift+e",
	callback : function()
	{
		$("#filled-in-box3").attr("checked", true);
	}
})

hotKey.add({
	combo : "shift+h",
	callback : function()
	{
		$("#filled-in-box4").attr("checked", true);
	}
})

hotKey.add({
	combo : "shift+i",
	callback : function()
	{
		$("#filled-in-box5").attr("checked", true);
	}
})

hotKey.add({
	combo : "shift+d",
	callback : function()
	{
		$("#filled-in-box6").attr("checked", true);
	}
})

hotKey.add({
	combo : "shift+n",
	callback : function()
	{
		$("#filled-in-box7").attr("checked", true);
	}
})

Template.sectionList.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.sectionList.helpers
(
	{
		sections: function ()
		{
			var result = [];
			Sections.find({}).forEach(function (item) {
				item.course = Courses.findOne(item.course) || '';
				item.semester = Semesters.findOne(item.semester) || '';
				result.push(item);
			});
			//console.log("results: " + JSON.stringify(result));
			return result;
		}
	}
);

Template.sectionList.helpers
(
	{
		courses: function ()
		{
			return Courses.find({});
		},

		semesters: function ()
		{
			return Semesters.find({});
		}
	}
);

Template.sectionList.events
(
	{
		'click .pointer-hover': function (event)
		{
			event.preventDefault();
			Session.set('course', this.course);
			Session.set('semester', this.semester);
			FlowRouter.go('/admin/section/' + this._id);
		},

		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteSection', this._id);
		},

		'click #addSection': function (event)
		{
			FlowRouter.go('/admin/section/new');
		},

		'click #addSectionCSV': function (event)
		{
			event.preventDefault();
			$('#sectionCSV_modal').modal('show');
		},
		'change [name="uploadCSV"]'(event, template)
		{
			Papa.parse(event.target.files[0], 
				{
					header : true,
					complete(results, file)
					{
						Meteor.call('parseUpload', results.data, (error, response) => {
							if(error)
							{
								console.log(error.reason);
							}
							else
							{
								Bert.alert('Upload complete', 'success', 'growl-top-right');
							}
						});
					}
				}
			);
		}

	}
);
