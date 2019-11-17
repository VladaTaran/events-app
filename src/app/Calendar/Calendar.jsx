import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from './Modal';
import Paper from '@material-ui/core/Paper';


import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, parseEvents] =  useState([]);
  const [eventInfo, handleEvent] = useState({
    openEvent: false,
    clickedEvent: {},
    start: new Date(),
    end: new Date(),
    title: '',
    description: '',
    openSlot: false
  });
  const getEvents = () => {
    const savedEvents = window.localStorage.getItem('savedEvents');
    const changeEventsWithDate = savedEvents && JSON.parse(savedEvents).map(event => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
      return event;
    });
    parseEvents(changeEventsWithDate);
 }
  useEffect(()=>{
    getEvents()
  }, []);
  const handleEventSelected = e => {
    handleEvent({
      openEvent: true,
      clickedEvent: e,
      start: new Date(e.start),
      end: new Date(e.end),
      title: e.title,
      description: e.description
    });
  }
const handleSlotSelected = slotInfo => {
  handleEvent( prevProps => ({
    ...prevProps,
    title: slotInfo.title,
    description: slotInfo.description,
    start: new Date(slotInfo.start),
    end: new Date(slotInfo.end),
    openSlot: true,
  }));
}

const handleClose = () => handleEvent(prevProps => ({ ...prevProps,openSlot: false, openEvent: false }));

const setNewEvent = () => {
  const { start, end, title, description } = eventInfo;
  const appointment = { title, start, end, description };
  events.push(appointment); 
  handleEvent(prevProps => ({...prevProps, events }));
  window.localStorage.setItem('savedEvents', JSON.stringify(events));
}

const deleteEvent = () => {
  const updatedEvents = events.filter(event => event.start !== eventInfo.clickedEvent.start && event);
  parseEvents(updatedEvents);
  window.localStorage.setItem("savedEvents", JSON.stringify(updatedEvents));
}

const setTitle = title => handleEvent(prevProps => ({ ...prevProps, title }));
const setDescription = description => handleEvent(prevProps => ({ ...prevProps, description }));
const handleStartTime = date => handleEvent(prevProps => ({ ...prevProps, start: moment(date).toDate() }) ); 
const handleEndTime = date => handleEvent(prevProps => ({ ...prevProps, end: moment(date).toDate() }) ); 

const updateEvent = () => {
  const { title, description, start, end, clickedEvent } = eventInfo;
    const index = events.findIndex(event => event === clickedEvent);
    const updatedEvent = events.slice();
    updatedEvent[index].title = title;
    updatedEvent[index].description = description;
    updatedEvent[index].start = new Date(start);
    updatedEvent[index].end = new Date(end);
    window.localStorage.setItem("savedEvents", JSON.stringify(updatedEvent));
    handleEvent(prevProps => ({ ...prevProps, events: updatedEvent }) );
}

  return (
    <div>
      <Title>Calendar</Title>
      <Paper 
        style={{
          padding: "20px", 
          maxWidth: "1170px",
          width: "100%", 
          height: "520px"
        }}
      >
        <div>
          <SubTitle>Calendar View</SubTitle>
          <BigCalendar
            localizer={localizer}
            events={events}
            views={["month", "week", "day", "agenda"]}
            timeslots={2}
            defaultView="month"
            defaultDate={new Date()}
            selectable
            onSelectEvent={e => handleEventSelected(e)}
            onSelectSlot={slotInfo => handleSlotSelected(slotInfo)}
            style={{height: 450,margin: "0 auto",width: "1170px"}}
          />
          <Modal 
            start={eventInfo.start}
            end={eventInfo.end}
            openEvent={eventInfo.openEvent}
            handleClose={handleClose}
            title={eventInfo.title}
            setTitle={setTitle}
            description={eventInfo.description}
            setDescription={setDescription}
            deleteEvent={deleteEvent}
            updateEvent={updateEvent}
            handleStartTime={handleStartTime}
            handleEndTime={handleEndTime}
            setNewEvent={setNewEvent}
            openSlot={eventInfo.openSlot}
          />
        </div>
      </Paper>
    </div>
  )
}

export default Calendar;

const Title = styled.div`
  color: #6e6d83;
  font-family: "Source Sans Pro";
  font-size: 28px;
  margin-bottom: 32px;
`;
const SubTitle = styled.span`
  display: inline-block;
  font-size: 18px; 
  color: #4D4F5C;
  margin-bottom: 15px;
`;