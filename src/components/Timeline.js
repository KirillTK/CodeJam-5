import React, { Component } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';

class TimelineComponent extends Component {
  constructor(props) {
    super(props);

    this.events = props.events;
  }
  
  render() {
    const timelines = this.events.map((event, i) => {
      return (
        <TimelineItem
          key={i}
          dateText={event.dateText}
        >
          <h4>{event.dateDescription}</h4>
        </TimelineItem>
      )
    });
    
    return (
      <Timeline lineColor={'#ddd'}>
        {timelines}
      </Timeline>
    )
  }
}

export default TimelineComponent;
