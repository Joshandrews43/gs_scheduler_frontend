import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm';
import SelectedCourses from './SelectedCourses';
import Title from './Title';
import GenerateButton from './GenerateButton.js';
import DropdownInput from './DropdownInput.js';
import { postRequest, getRequest } from '../helpers/util.js';

import '../styles/reset.css';
import '../styles/global.css';

//calendar imports
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';

//moment imports
import moment from 'moment';
import { extendMoment } from 'moment-range';

const DropdownContainer = styled.div`
  display: ${props => props.displayDropdown ? 'block' : 'none'}
  width: 200px;
`;

const CalendarContainer = styled.div`
  min-width: 700px;
  display: ${props => props.displayCalendar ? 'block' : 'none'}
  overflow-y: scroll;
`;

const WeekCalendarContainer = styled.div`
  margin-bottom: 30px;
`;

const InputVisibleContainer = styled.div`
  display: ${props => props.displayInputForm ? 'block' : 'none'}
`;

const Container = styled.div`
  padding-top: 150px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MiddleContainer = styled.div`
  margin-top: 30px;
  align-items: center;
  width: 940px;
  justify-content: space-around;

`;

// terrible code, never do this
// document.getElementsByClassName('weekCalendar')


class HomePage extends Component {
  state = {
    selectedCourses: [],
    displaySchedules: false,
    scheduleTimes: [],
    filter: '',
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

      // once we get a bunch of schedules, change this to iterate over the schedules.
      const courses = res.schedules.map((schedule, index) => {
        if (index > 10) return;
        const courses = schedule.courses;
        this.setState({
          scheduleTimes: this.state.scheduleTimes.concat([[]])
        })
        this.parseCourses(courses);

      });

    })
    .catch(error => {
      console.log(error);
    })

    this.setState({ displaySchedules: true });
  }

  parseCourses = courses => {
    const lastSchedule = this.state.scheduleTimes[this.state.scheduleTimes.length - 1];
    courses.map(course => {
      const courseName = course.courseID;

      const lectures = course.lectures[0];
      const sections = lectures.sections[0];
      //  every time this loop runs, it will give you a start and end time for a lecture as tbe result at the bottom.

      lectures.days.map(day => {
        const lectureDayNumber = parseDate(day)

        const momentLectureStart = moment({days: lectureDayNumber, h: lectures.time.start.hour, m: lectures.time.start.minute});
        const momentLectureEnd = moment({days: lectureDayNumber, h: lectures.time.end.hour, m: lectures.time.end.minute});

        const momentInterval = {
          start: momentLectureStart,
          end: momentLectureEnd
        }

        lastSchedule.push(momentInterval);
      })


      sections.days.map(day => {
        const sectionDayNumber = parseDate(day)

        const momentSectionStart = moment({day: sectionDayNumber, h: sections.time.start.hour, m: sections.time.start.minute});
        const momentSectionEnd = moment({day: sectionDayNumber, h: sections.time.end.hour, m: sections.time.end.minute});

        const momentInterval = {
          start: momentSectionStart,
          end: momentSectionEnd
        }

        lastSchedule.push(momentInterval);
      })

      this.setState({
        scheduleTimes: this.state.scheduleTimes.concat([lastSchedule])
      })
    })
  }

  onFilterSelect = (e) => {
    this.setState({
      filter: e.target.value
    })
  }


  render() {
    console.log('Schedule times:')
    console.log(this.state.scheduleTimes)

    const { selectedCourses } = this.state;
    return (
      <Container className="flex-column">
        <InputForm
          addCourse={this.addCourse}
          displayForm={!this.state.displaySchedules}
        />
        <SelectedCourses
          courses={selectedCourses}
          deleteCourse={this.deleteCourse}
        />

        <MiddleContainer className="flex-row">
          <div className="flex-column flex-full-center">
            <DropdownContainer
              displayDropdown={!this.state.displaySchedules}
            >
              <DropdownInput
                labelText="Select Filter (optional)"
                options={options}
                value={this.state.filter}
                onChange={this.onFilterSelect}
              />
            </DropdownContainer>
            <GenerateButton
              onClick={this.onGenerateClicked}
              displayButton={!this.state.displaySchedules}
            />
          </div>
        </MiddleContainer>

        <CalendarContainer
          displayCalendar={this.state.displaySchedules}
        >
          {this.renderCalendars()}
        </CalendarContainer>

      </Container>
    );
  }

  renderCalendars = () => {
    if (this.state.scheduleTimes[0] === []) return null;
    return this.state.scheduleTimes.map((schedule, index) => {
      return (
        <WeekCalendarContainer key={`schedule${index}`}>
          <WeekCalendar
            key={`calendar${index}`}
            useModal={true}
            className="style"
            numberOfDays={5}
            dayFormat="dd"
            scaleUnit={30}
            firstDay = {moment().date(20)}
            startTime = {moment({h: 8, m: 0})}
            endTime = {moment({h: 22, m: 15})}
            selectedIntervals={schedule}
          />
        </WeekCalendarContainer>
      )
    })
  }
}


// dates are may 13 to may 17
// 13 = monday, 14 = tuesday, 15 = wednesday, 16 = thursday, 17 = friday



const options = [
   'Morning Classes', 'Mid-Day Classes', 'Evening Classes', 'Highest Rate My Professor'
];
const defaultOption = options[0];


const parseDate = letterDay => {
  switch (letterDay) {
    case 'M':
      return 20;
    case 'T':
      return 21;
    case 'W':
      return 22;
    case 'Th':
      return 23;
    case 'F':
      return 24;
    default:

  }


}

export default HomePage;
