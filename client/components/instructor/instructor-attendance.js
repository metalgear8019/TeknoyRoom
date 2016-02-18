Template.instructorAttendance.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe(SubscriptionTag.ONE_ENROLLEE_SECTION, id);
		self.subscribe(SubscriptionTag.ONE_SECTION, id);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.instructorAttendance.helpers
(
	{
		calendarOptions: 
		{
            height: 500,
            events: function(start, end, timezone, callback) {
                var events = [];
                var id = FlowRouter.getParam('id');
                var section = Sections.findOne(id);
                var semester = Semesters.findOne(section.semester);
				var result = Enrollees.findOne({ section: id });
				var attendance = result.attendance;
				var start_date = semester.start_date;
				var end_date = semester.end_date;
				var i = 0;
				var haveClasses = false;

				var currentDate = new Date();

				if (((currentDate.valueOf() >= semester.start_date.valueOf()) && (currentDate.valueOf() < semester.end_date.valueOf())))
				{
					end_date = currentDate;
				}


				while(start_date <= end_date)
				{
					for (var j = 0; j < section.day.length; j++)
					{
						if ((start_date.getDay()+1) == section.day[j])
						{
							haveClasses = true; 
							break;
						}
						else if ((start_date.getDay()+1)%7 == section.day[j])
						{
							haveClasses = true;
							break;
						}
					}

					if (haveClasses)
					{
						for (var a = 0; a < attendance.length; a++)
						{
							var firstDate = new Date(attendance[a].time_in.getFullYear(), attendance[a].time_in.getMonth(), attendance[a].time_in.getDate());
							var secondDate = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());

							if (firstDate.valueOf() == secondDate.valueOf())
							{
								var startDate = (attendance[a].time_in.getFullYear()) + '-' + (((attendance[a].time_in.getMonth()+1) < 10)? '0'+(attendance[a].time_in.getMonth()+1): (attendance[a].time_in.getMonth()+1)) + '-' + (((attendance[a].time_in.getDate()) < 10)? ('0'+ attendance[a].time_in.getDate()): attendance[a].time_in.getDate());
								events.push({title: 'Present', start: startDate, rendering: 'background', color: '#8BC34A'});
								break;
							}
							else
							{
								var startDate = (start_date.getFullYear()) + '-' + (((start_date.getMonth()+1) < 10)? '0'+(start_date.getMonth()+1): (start_date.getMonth()+1)) + '-' + (((start_date.getDate()) < 10)? ('0'+ start_date.getDate()): start_date.getDate());
								events.push({title: 'Absent', start: startDate, rendering: 'background', color: '#F44336'});
								console.log(startDate);
								break;
							}
						}
						haveClasses = false;
					}

					start_date.setDate(start_date.getDate() + 1);
					i++;
				}

                callback(events);
            },
            id: "calendar1",
            autoruns: [
                function () {
                    console.log("user defined autorun function executed!");
                }
            ]
        }
	}
);