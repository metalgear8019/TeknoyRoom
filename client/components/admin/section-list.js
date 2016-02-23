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
	Session.set('searchTerm', '');
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
			var ses = Session.get('searchTerm');
			var result = [];
			if (ses == undefined || ses == '')
			{
				Sections.find({}).forEach(function (item) {
					item.course = Courses.findOne(item.course) || '';
					item.semester = Semesters.findOne(item.semester) || '';
					item.schedule = Helpers.scheduleToString(item);;
					result.push(item);
				});
			}
			else
			{
				Sections.find({'name': { $regex: '.*' + ses + '.*' }}).forEach(function (item) {
					item.course = Courses.findOne(item.course) || '';
					item.semester = Semesters.findOne(item.semester) || '';
					result.push(item);
				});
			}
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
		'keyup #search': function(event)
		{
			event.preventDefault();
			var value = event.target.value;
			Session.set("searchTerm", value);
		},

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
			Meteor.call('deleteSection', this._id, function(err){
				if(err)
					Notifications.error('Error',err.reason,{timeout: 5000});
				else
					Notifications.success('Success','Section successfully deleted',{timeout: 5000});
			});
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

		'change [name="uploadCSV"]' (event)
		{
		    //template.uploading.set(true);

		    Papa.parse(event.target.files[0],{
		      header : true,
		      complete(results, file ){
		        Meteor.call('parseSectionUpload', results.data, (error, response) => {
		          if(error)
		            Notifications.error('Error',error.reason,{timeout: 5000});
		          else
		            //template.uploading.set(false);
		            //Bert.alert('Upload complete', 'success', 'growl-top-right');
		            Notifications.success('Success','uploading success',{timeout: 5000});
		          //}
		        });
		      }
		    });
		 }
	}
);
