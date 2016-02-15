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
		'submit #image_upload' : function(event)
		{
			event.preventDefault();
			var preview = document.getElementById("imagine");
		    var file = document.querySelector('input[type=file]').files[0];
		    //var buffer = new Buffer(file, 'binary');
		    var reader = new FileReader();

		    /*reader.onload = function(e){
		      preview.src = e.target.result;
		      console.log(reader.result);
		      //btoa(reader.result);
		      //var obj = atob(reader.result);
		    }
		    if(file){
		    	console.log(file);
		    	btoa(file);
		    	var obj = atob(file);
		        reader.readAsDataURL(file);
		      //btoa(file);
		      //var obj = atob(file);
		      //Meteor.call("insertion", obj);
		    }else{
		      preview.src = "";
		    }
		    }*/
		    reader.onload = function(e){
		    	console.log('n');
			    Imgur.upload({
			    	apiKey : 'be707efe5645e5b',
			    	image : btoa(e.target.result)
			    },
			    
			    	function(error, data){
			    		if(error){
			    			console.log("There is an error\n" + error);
			    		}else{
			    			preview.src = data.link;
			    			console.log("ni agi na cya diri");
			    		}
			    		
			    	}
			    );
			};
			reader.readAsBinaryString(file);
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