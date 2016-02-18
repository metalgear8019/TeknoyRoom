Role = 
{
    Group: 
    {
        ADMIN: 'admin',
        INSTRUCTOR: 'instructor',
        STUDENT: 'student',
        GUEST: 'guest'
    },
    Permission:
    {
        WRITE_USERS: 'write-users',
        READ_USERS: 'read-users',
        WRITE_COURSES: 'write-courses',
        READ_COURSES: 'read-courses',
        WRITE_SECTIONS: 'write-sections',
        READ_SECTIONS: 'read-sections',
        WRITE_SEMESTERS: 'write-semesters',
        READ_SEMESTERS: 'read-semesters'
    },
    generatePermissions: function (type) 
    {
        var permissions = 
        [
            this.Permission.GUEST,
            this.Permission.READ_USERS,
            this.Permission.READ_COURSES,
            this.Permission.READ_SECTIONS,
            this.Permission.READ_SEMESTERS
        ];
        if (type == 0) 
        {
            permissions[0] = this.Group.ADMIN;
            permissions.push(this.Permission.WRITE_USERS);
            permissions.push(this.Permission.WRITE_COURSES);
            permissions.push(this.Permission.WRITE_SECTIONS);
            permissions.push(this.Permission.WRITE_SEMESTERS);
        }
        else if (type == 1)
        {
            permissions[0] = this.Group.INSTRUCTOR;
        }
        else if (type == 2)
        {
            permissions[0] = this.Group.STUDENT;
        }

        console.log(permissions);
        return permissions;
    }
};

Schema = {};

Schema.PeerStatus = new SimpleSchema({
    _id: {
        type: String,
        optional: true
    },
    room_id: {
        type: String,
        optional: true
    }
});

Schema.UserProfile = new SimpleSchema({
	id_number: {
        type: String,
        optional: true
    },
    first_name: {
        type: String,
        optional: true
    },
    middle_name: {
        type: String,
        optional: true
    },
    last_name: {
        type: String,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    banned: {
    	type: Boolean,
    	optional: true
    },
    department: {
        type: String,
        optional: true
    },
    program: {
        type: String,
        optional: true
    },
    year: {
        type: String,
        optional: true
    },
    user_type: {
        type: Number,
        optional: true
    },
    image : {
        type: String,
        optional : true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object,
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();  // Prevent user from supplying their own value
			}
		}
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true/*,
        allowedValues: [
            Role.Permission.READ_USERS,
            Role.Permission.READ_COURSES,
            Role.Permission.READ_SECTIONS,
            Role.Permission.READ_SEMESTERS,
            Role.Permission.WRITE_USERS,
            Role.Permission.WRITE_COURSES,
            Role.Permission.WRITE_SECTIONS,
            Role.Permission.WRITE_SEMESTERS
        ]*/
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    },
    status: {
        type: Object,
        optional: true,
        blackbox: true
    },
    peer: {
        type: Schema.PeerStatus,
        optional: true
    }
});

//Schema for the course collection
Schema.Course = new SimpleSchema({
    subject_number:
    {
        type: String,
        optional: true
    },
    title:
    {
        type: String,
        optional: true
    },
    unit:
    {
        type: String,
        allowedValues: ["1.0","2.0","3.0","4.0","6.0"],
        optional: true
    }
});

//Schema for the section collection
Schema.Section = new SimpleSchema({
    name:
    {
        type: String,
        optional: true
    },
    course: 
    {
        type: String,
        optional: true
    },
    semester:
    {
        type: String,
        optional: true
    },
    day:
    {
        type: [Number],
        optional: true
    },
    hour:
    {
        type: Number,
        optional: true
    },
    minute:
    {
        type: Number,
        optional: true
    },
    duration:
    {
        type: Number,
        optional: true
    }
});

//Schema for the Semester Collection
Schema.Semester = new SimpleSchema({
    school_year:
    {
        type: String,
        optional: true
    },
    start_date:
    {
        type: Date,
        optional: true
    },
    end_date:
    {
        type: Date,
        optional: true
    },
    name:
    {
        type: String,
        optional: true
    }
});

//Schema for the attendance
Schema.Attendance = new SimpleSchema({
    time_in:
    {
        type: Date,
        optional: true
    },
    time_out:
    {
        type: Date,
        optional: true
    }
});

//Schema for the Enrollee
Schema.Enrollee = new SimpleSchema({
    user:
    {
        type: String,
        optional: true
    },
    section:
    {
        type: String, 
        optional: true
    },
    attendance:
    {
        type: [Schema.Attendance],
        optional: true
    }
});

//Schema for Note Collection
Schema.Note = new SimpleSchema({
    owner:
    {
        type: String,
        optional: true
    },
    course:
    {
        type: String,
        optional: true
    },
    content:
    {
        type: String,
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);