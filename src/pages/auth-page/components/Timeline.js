import React, { Component } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';

class TimelineComponent extends Component {
  render() {
    return (
      <Timeline lineColor={'#ddd'}>
        <TimelineItem
          key="001"
          dateText="08/12/1985"
          style={{ color: '#e86971' }}
        >
          <h4>Родился Роман Алексеевич Дервоед в Орше (Беларусская ССР)</h4>
        </TimelineItem>
        <TimelineItem
          key="002"
          dateText="2006 год"
          dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
          bodyContainerStyle={{
            background: '#ddd',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <h4 style={{ color: '#61b8ff' }}>Окончил Могилёвский государственный колледж искусств по специальности «актёр театра и кино».</h4>
        </TimelineItem>
        <TimelineItem
          key="003"
          dateText="2007 год"
        >
          <h4>Организовал в Гомеле театр-студию «Колесо», являлся его художественным руководителем и режиссёром.</h4>
        </TimelineItem>
        <TimelineItem
          key="004"
          dateText="C 2008 года"
          dateInnerStyle={{ background: '#76bb7f' }}
        >
          <h4>Актёр, режиссёр Национального академического драматического театра имени М.Горького.</h4>
        </TimelineItem>
      </Timeline>
    )
  }
}

export default TimelineComponent;
