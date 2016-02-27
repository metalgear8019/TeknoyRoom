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

SubscriptionTag = {
	ONE_USER: 'user',
	ALL_USERS: 'users',
	ONE_COURSE: 'course',
	ONE_COURSE_SECTION: 'course_section',
	ALL_COURSES: 'courses',
	ONE_SECTION: 'section',
	ALL_SECTIONS: 'sections',
	ONE_SEMESTER: 'semester',
	ALL_SEMESTERS: 'semesters',
	CURRENT_SEMESTER: 'current_semester',
	PREVIOUS_SEMESTERS: 'previous_semesters',
	ONE_ENROLLEE: 'enrollee',
	ONE_ENROLLEE_SECTION: 'enrollee_section',
	ALL_ENROLLEES: 'enrollees',
	ALL_ENROLLEES_USER: 'enrollees_user',
	ONE_NOTE: 'note',
	ALL_NOTES: 'notes',
	CURRENT_NOTE: 'current_note',
	ALL_USER_NOTES: 'user_notes',
	PRESENCES: 'presences',
	CURRENT_CLASS: 'current_class'
};

CollectionName = {
	ROLES: 'roles',
	USERS: 'users',
	COURSES: 'courses',
	SECTIONS: 'sections',
	SEMESTERS: 'semesters',
	ENROLLEES: 'enrollees',
	NOTES: 'notes'
};