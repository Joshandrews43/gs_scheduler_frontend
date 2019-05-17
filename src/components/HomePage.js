import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm' ;
import SelectedCourses from './SelectedCourses' ;
import Title from './Title' ;
import GenerateButton from './GenerateButton.js';

import { postRequest, getRequest } from '../helpers/util.js';

import '../styles/reset.css';
import '../styles/global.css';

import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import moment from 'moment';

const Container = styled.div`
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  height: 100vh;
`;

const MiddleContainer = styled.div`
  width: 100%;
  justify-content: space-evenly;
`;
const GenerateButtonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
`;

class HomePage extends Component {
  state = {
    selectedCourses: []
  }

  addCourse = (course) => {
    const { selectedCourses } = this.state;
    this.setState({
      selectedCourses: selectedCourses.concat(course)
    })
  }

  deleteCourse = (courseToDelete) => {
    const { selectedCourses } = this.state;
    selectedCourses.map((course, index) => {
      if (courseToDelete === course) {
        this.setState({
          selectedCourses: selectedCourses.slice(0, index).concat(selectedCourses.slice(index + 1, selectedCourses.length))
        });
      }
    });
  }

  onGenerateClicked = () => {
    const { selectedCourses } = this.state;

    const params = {
      mandatory: selectedCourses,
      optional: [],
      filters: []
    }

    postRequest('/generateSchedules', params)
    .then(res => {
      console.log(res);

      // once we get a bunch of schedules, change this to iterate over the schedules.
      const courses = res.schedules.map(schedule =>{
        const courses = schedule.courses ;
        parseCourses(courses);

      });
    
    })
    .catch(error => {
      console.log(error);
    })
  }


  render() {
    const { selectedCourses } = this.state;
    return (
      <Container className="flex-column flex-full-center">
        <Title/>
        <MiddleContainer className="flex-row">
          <InputForm
            addCourse={this.addCourse}
          />

          <GenerateButton
            onClick={this.onGenerateClicked}
          />
          <SelectedCourses
            courses={selectedCourses}
            deleteCourse={this.deleteCourse}
          />
          <WeekCalendar
           className = "style" 
           numberOfDays="5"
           dayFormat="dd"
           firstDay = {moment().day(1)}
           startTime = {moment({h: 8, m: 0})}
           endTime = {moment({h: 22, m: 15})}
           />
        </MiddleContainer>
      </Container>
    );
  }
}

// dates are may 13 to may 17
// 13 = monday, 14 = tuesday, 15 = wednesday, 16 = thursday, 17 = friday

const parseCourses = courses => {
  courses.map(course => {
    const courseName = course.courseID;

    const lectures = course.lectures[0];
    const sections = lectures.sections[0] ;
    //  every time this loop runs, it will give you a start and end time for a lecture as tbe result at the bottom.

    lectures.days.map(day => {
      const lectureDayNumber = parseDate(day)
      const startDateString = `May ${lectureDayNumber}, 2019 ${lectures.time.start.hour}:${lectures.time.start.minute}:00`;
      const endDateString = `May ${lectureDayNumber}, 2019 ${lectures.time.end.hour}:${lectures.time.end.minute}:00`;

      // these are the end result we need.
      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);
      console.log(startDate + 'to ' + endDate)
    })
    sections.days.map(day => {
      const sectionDayNumber = parseDate(day)
      const startString = `May ${sectionDayNumber}, 2019 ${sections.time.start.hour}:${sections.time.start.minute}:00` ;
      const endString = `May ${sectionDayNumber}, 2019 ${sections.time.end.hour}:${sections.time.end.minute}:00` ;

      //console log part
      const startDay = new Date(startString) ;
      const endDay = new Date(endString) ;
      console.log(startDay + 'to ' + endDay)
    
    })




  })
  
}

const parseDate = letterDay => {
  switch (letterDay) {
    case 'M':
      return 13;
    case 'T':
      return 14;
    case 'W':
      return 15;
    case 'Th':
      return 16;
    case 'F':
      return 17;
    default:

  }
}

export default HomePage;
