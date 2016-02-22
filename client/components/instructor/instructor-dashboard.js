Template.instructorDashboard.onCreated(function () {
	var self = this;
	var time = Session.get('time');
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_NOTES);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		// self.subscribe(SubscriptionTag.CURRENT_CLASS, time, Meteor.userId());
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
	});
});

var noteDependency = new Tracker.Dependency();

Tracker.autorun(function(){
	note = {
		_id: 'new',
		owner:'',
		course: '',
		content: ''
	};	
});

Template.instructorDashboard.helpers
(
	{
		name: function() 
		{
			var result = Meteor.user();
			return result.profile.first_name;
		},

		notes: function()
		{
			var id = Meteor.userId();
			return Notes.find({'owner': id});
		},

		note: function()
		{
			noteDependency.depend();
			return note;
		},

		class: function()
		{
			var text = 'No classes yet';
			var currentClass = Helpers.getCurrentClass();
			if (!Helpers.isEmpty(currentClass))
				text = 'Go to ' + Courses.findOne({ _id: currentClass.course }).title + ' ' + currentClass.name;
			return text;
		}
	}
);

Template.instructorDashboard.events
(
	{
		'click .notes': function (event)
		{
			event.preventDefault();
			$('#notes_modal').modal('show');
			note = this;
			$('#content').val(note.content);
			noteDependency.changed();
		},

		'click .delete': function (event)
		{
			event.preventDefault();
			note = this;
			Meteor.call('deleteNote', note._id);
		},

		'click #addnote': function (event)
		{
			event.preventDefault();
			note = {
				_id: 'new',
				owner:'',
				course: '',
				content: ''
			};
			noteDependency.changed();
			$('#notes_modal').modal('show');
		},

		'click #clearContent': function(event)
		{
			event.preventDefault();
			$('#content').val('');
		},

		'click #enterClass': function (event)
		{
			event.preventDefault();
			var result = Helpers.getCurrentClass();
			console.log(JSON.stringify(result));

			if (!Helpers.isEmpty(result)) {
				console.log("duration >> " + result.duration + "\ntime passed >> " + 
					Helpers.getDurationPast(Helpers.getTime(), result.hour, result.minute));
				Session.set('class', result._id);
				console.log('enrolled id >> ' + Session.get('class'));
				FlowRouter.go(getRouteGroup() + '/current/enter');
			} else {
				Notifications.warn('WARNING', 'No classes is currently in session', {timeout: 5000});
			}
		},

		'submit #frmNote': function(event)
		{
			event.preventDefault();
			var content = event.target.content.value;
			var title = event.target.notes_title.value;

			if (note._id == 'new')
			{
				console.log('adding');
				var id = Meteor.userId();
				var newNote = {
					owner: id,
					course: title,
					content: content
				};
				Meteor.call('addNote', newNote);
			}
			else
			{
				var updatedNote = {
					owner: note.owner,
					course: title,
					content: content
				};
				Meteor.call('updateNote', note._id, updatedNote);
			}
			
			$('#notes_modal').modal('hide');
			note = {
				_id: 'new',
				owner:'',
				course: '',
				content: ''
			};
			noteDependency.changed();
		}
	}
);