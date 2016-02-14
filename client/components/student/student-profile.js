Template.studentProfile.events
(
	{
		'click #menu-toggle': function (event)
		{
			event.preventDefault();
			$("#wrapper").toggleClass("active");
		},
		'click .profPic' : function()
		{
			$('#image_modal').modal('show');
		},
		'click .btn' : function()
		{
			var preview = document.querySelector('img');
		    var file = document.querySelector('input[type=file]').files[0];
		    var reader = new FileReader();

		    reader.onload = function(e){
		      preview.src = e.target.result;
		      console.log(reader.result);
		      //btoa(reader.result);
		      //var obj = atob(reader.result);
		      
		    }

		    if(file){
		      reader.readAsDataURL(file);
		      //btoa(file);
		      //var obj = atob(file);
		      //Meteor.call("insertion", obj);
		    }else{
		      preview.src = "";
		    }
		}
	}
);

Template.studentProfile.helpers
(
	{
		name: function() {
			var result = Meteor.user();
			return result.profile.first_name + ' ' + result.profile.middle_name + ' ' + result.profile.last_name;
		},
		year: function() {
			var result = Meteor.user();
			return result.profile.year;
		},
		program: function() {
			var result = Meteor.user();
			return result.profile.program;
		},
		gender: function() {
			var result = Meteor.user();
			return result.profile.gender;
		}
	}
);