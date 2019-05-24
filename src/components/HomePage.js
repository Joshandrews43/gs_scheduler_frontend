import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm';
import SelectedCourses from './SelectedCourses';
import Title from './Title';
import GenerateButton from './GenerateButton.js';
import DropdownInput from './DropdownInput.js';
import EventComponent from './EventComponent.js';
import FilterSelector from './Filters.js';
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

const InputVisibleContainer = styled.div``;

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
    filters: [
      {
        type: 'Time',
        option: null
      },
      {
        type: 'Gaps',
        option: null
      },
      {
        type: 'Day',
        option: null
      }
    ],
    render: false,
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

    this.setState({
      scheduleTimes: [],
      render: false,
      loading: true,
      displaySchedules: false
    });

    postRequest('/generateSchedules', params)
    .then(res => {
      this.parseSchedulesFromResponse(res);
    })
    .catch(error => {
      console.log(error);
    })
  }

  parseSchedulesFromResponse = res => {
    res.schedules.map((schedule, index) => {
      const courses = schedule.courses;
      this.setState({
        scheduleTimes: this.state.scheduleTimes.concat([[]])
      }, () => {
        this.parseCourses(courses);
      })
    });
    this.setState({ displaySchedules: true, render: true, loading: false });

  }

  parseCourses = courses => {
    const lastSchedule = this.state.scheduleTimes[this.state.scheduleTimes.length - 1];
    courses.map((course, index) => {
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
          end: momentLectureEnd,
          value: courseName
        }

        lastSchedule.push(momentInterval);
      })

      if (sections) {
        sections.days.map(day => {
          const sectionDayNumber = parseDate(day)

          const momentSectionStart = moment({day: sectionDayNumber, h: sections.time.start.hour, m: sections.time.start.minute});
          const momentSectionEnd = moment({day: sectionDayNumber, h: sections.time.end.hour, m: sections.time.end.minute});

          const momentInterval = {
            start: momentSectionStart,
            end: momentSectionEnd,
            value: courseName
          }

          lastSchedule.push(momentInterval);
        })
      }
    })
  }

  onFilterSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.filters.map((filter, i) => {
      if (filter.type.toUpperCase() === String(name).toUpperCase()) {
        const newObject = {
          type: name,
          option: value
        }
        this.setState({
          filters: this.state.filters.slice(0, i).concat([newObject]).concat(this.state.filters.slice(i+1))
        })
      }
    })
  }

  applyFilters = () => {
    var params = {
      filters: []
    };
    this.state.filters.map(filter => {
      params.filters.push(filter);
    })

    this.setState({
      scheduleTimes: [],
      render: false,
      loading: true,
      displaySchedules: false
    });

    postRequest('/api/v1/schedule/generate/filter', params)
    .then(res => {
      this.parseSchedulesFromResponse(res)
    })
  }


  render() {
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
          <FilterSelector
            displayFilters={this.state.displaySchedules}
            onFilterSelect={this.onFilterSelect}
            applyFilters={this.applyFilters}
          />
          <div className="flex-column flex-full-center">
            <DropdownContainer
              displayDropdown={!this.state.displaySchedules}
            />
            <GenerateButton
              onClick={this.onGenerateClicked}
              loading={this.state.loading}
            />
          </div>
        </MiddleContainer>

        <CalendarContainer
          displayCalendar={this.state.displaySchedules}
        >
          {this.state.render ? this.renderCalendars() : null}
        </CalendarContainer>

      </Container>
    );
  }

  renderCalendars = () => {
    if (this.state.scheduleTimes[0] === []) return null;
    return this.state.scheduleTimes.map((schedule, index) => {
      return (
        <WeekCalendarContainer key={`schedule${index + Math.random()}`}>
          <div>{index}</div>
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
            eventComponent={EventComponent}
            selectedIntervals={schedule}
          />
        </WeekCalendarContainer>
      )
    })
  }
}

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
    case 'R':
      return 23;
    case 'F':
      return 24;
    default:
      return;

  }
}

export default HomePage;
