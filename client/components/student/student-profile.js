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

		'change #imageUpload': function(event)
		{
			event.preventDefault();
			if(event.target.files && event.target.files[0]){
		      var reader = new FileReader();
		      reader.onload = function(e){
		        $('#previewImage')
		          .attr('src', e.target.result)
		          .height(200);
		     };

		    	reader.readAsDataURL(event.target.files[0]);
			}
		},

		'submit #image_upload' : function(event)
		{
			event.preventDefault();
			var preview = document.getElementById("image");
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
			    			//console.log("ni agi na cya diri");
			    			var user_img = data.link;
			    			console.log(data.link);
			    			console.log(data);
			    			Meteor.call('updateImage', Meteor.userId(), user_img);
			    		}
			    		
			    	}
			    );
			};
			reader.readAsBinaryString(file);
			$('#image_modal').modal('hide');
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
		},
		image: function(){
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
		}
	}
);