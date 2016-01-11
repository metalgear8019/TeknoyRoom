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
		}
	}
);