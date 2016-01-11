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
        if (type === 0) 
        {
            permissions[0] = this.Group.ADMIN;
            permissions.push(this.Permission.WRITE_USERS);
            permissions.push(this.Permission.WRITE_COURSES);
            permissions.push(this.Permission.WRITE_SECTIONS);
            permissions.push(this.Permission.WRITE_SEMESTERS);
        }
        else if (type === 1)
        {
            permissions[0] = this.Group.INSTRUCTOR;
        }
        else if (type === 2)
        {
            permissions[0] = this.Group.USER;
        }

        return permissions;
    }
};

Schema = {};

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
    }
});

Meteor.users.attachSchema(Schema.User);