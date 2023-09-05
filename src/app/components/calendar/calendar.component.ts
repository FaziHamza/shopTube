import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId, INITIAL_EVENTS } from 'src/app/shared/event-utils/event-utils';

@Component({
  selector: 'st-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Input() calenderData: any;
  calendarOptions: CalendarOptions;
  calendarVisible = true;
  ngOnInit() {
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: "sidebarToggle , " + this.calenderData?.view,
        center: 'title',
        right: this.calenderData?.viewType
      },
      initialView: 'dayGridMonth',
      initialEvents: this.calenderData?.options, // alternatively, use the `events` setting to fetch from a feed
      weekends: this.calenderData?.weekends,
      editable: this.calenderData?.editable,
      selectable: this.calenderData?.selectable,
      selectMirror: this.calenderData?.selectMirror,
      dayMaxEvents: this.calenderData?.dayMaxEvents,
      // select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.calenderData?.details ? this.handleEvents.bind(this) : undefined
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }
  processData(data: any[]) {
    debugger
    if (data.length > 0) {
      this.calenderData.options = [];
      data.forEach((element, index) => {
        let event = {
          "id": index + 1, // Increment the index to start from 1
          "title": element.message,
          "start": this.extractDate(element.dateTime),
          "backgroundColor": "#fbe0e0",
          "textColor": "#ea5455",
          "color": "#EF6C00",
          "borderColor": "#ea5455"
        };
        this.calenderData.options.push(event);
      });
      this.calendarOptions.initialEvents = this.calenderData.options;
      this.calendarOptions = {
        plugins: [
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
        ],
        headerToolbar: {
          left: "sidebarToggle , " + this.calenderData?.view,
          center: 'title',
          right: this.calenderData?.viewType
        },
        initialView: 'dayGridMonth',
        initialEvents: this.calenderData?.options, // alternatively, use the `events` setting to fetch from a feed
        weekends: this.calenderData?.weekends,
        editable: this.calenderData?.editable,
        selectable: this.calenderData?.selectable,
        selectMirror: this.calenderData?.selectMirror,
        dayMaxEvents: this.calenderData?.dayMaxEvents,
        // select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this)
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      };
      // this.handleEvents(this);
      console.log("Calender")
    }
    
    this.changeDetector.detectChanges();
    return data
  }

  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {
    this.processData = this.processData.bind(this);

  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {

    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: '#fbe0e0',
        textColor: '#ea5455',
        color: '#EF6C00',
        borderColor: '#ea5455'
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  extractDate(date: any) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Add 1 to the month because it's zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
