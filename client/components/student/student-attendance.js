Template.studentAttendance.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
		self.subscribe(SubscriptionTag.ONE_SECTION, id);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.studentAttendance.helpers
(
	{
		/*records: function () 
		{
			var myCalendar = $('#myCalendar');
			var id = FlowRouter.getParam('id');
			var result = Enrollees.findOne({ section: id });
			console.log("results >> " + JSON.stringify(result));

			return function (start, end, tz, callback)
			{
				var events = result.attendance.forEach(function(attendance){
					 return {
					 	title: 'Sample',
					 	start: '2016-02-02',
					 	end: '2016-02-02',
						color: '#257e4a'
					}
				});

				myCalendar.fullCalendar('refetchEvents');
				callback(events);
			};
			//console.log("results >> " + JSON.stringify(result));
			//return result.attendance;
		}*/

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
				var a = 0;
				var haveClasses = false;

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

							if (firstDate.toString() == secondDate.toString())
							{
								var startDate = (attendance[a].time_in.getFullYear()) + '-' + (((attendance[a].time_in.getMonth()+1) < 10)? '0'+(attendance[a].time_in.getMonth()+1): (attendance[a].time_in.getMonth()+1)) + '-' + (attendance[a].time_in.getDate());
								events.push({title: 'Present', start: startDate, rendering: 'background', color: '#8BC34A'});
								break;
							}
							else
							{
								var startDate = (start_date.getFullYear()) + '-' + (((start_date.getMonth()+1) < 10)? '0'+(start_date.getMonth()+1): (start_date.getMonth()+1)) + '-' + (start_date.getDate());
								events.push({title: 'Absent', start: startDate, rendering: 'background', color: '#F44336'});
								break;
							}
						}
						haveClasses = false;
					}

					//result.attendance[i]
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

/*$('#myCalendar').fullCalendar({
			header: {
				center: 'title',
			},
			events: [
				{
					title: 'Business Lunch',
					start: '2016-01-03T13:00:00',
					constraint: 'businessHours'
				},
				{
					title: 'Meeting',
					start: '2016-01-13T11:00:00',
					constraint: 'availableForMeeting', // defined below
					color: '#257e4a'
				},
				{
					title: 'Conference',
					start: '2016-01-18',
					end: '2016-01-20'
				},
				{
					title: 'Party',
					start: '2016-01-29T20:00:00'
				},

				// areas where "Meeting" must be dropped
				{
					id: 'availableForMeeting',
					start: '2016-01-11T10:00:00',
					end: '2016-01-11T16:00:00',
					rendering: 'background'
				},
				{
					id: 'availableForMeeting',
					start: '2016-01-13T10:00:00',
					end: '2016-01-13T16:00:00',
					rendering: 'background'
				},

				// red areas where no events can be dropped
				{
					start: '2016-01-24',
					end: '2016-01-28',
					overlap: false,
					rendering: 'background',
					color: '#ff9f89'
				},
				{
					start: '2016-01-06',
					overlap: false,
					rendering: 'background',
					color: '#ff9f89'
				}
			]
		});*/