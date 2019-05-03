import React, {Component} from 'react';
import styled from 'styled-components';
import DropdownInput from './DropdownInput';
import Button from './Button';
import * as staticData from '../assets/staticData.json';
import * as courses from '../assets/spring2019.json';

const InputFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

class InputForm extends Component {
  state = {
    subject: '',
    quarter: '',
    selectedCourse: '',
    buttonDisabled: true,
    subjects: [],
    quarters: [],
    courses: [],
  }

  componentDidMount = () => {
    this.setState({
      subjects: getSubjects(),
    });
  }


  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({[name]: value}, () => {
      if (this.state.subject) {
        this.setState({
          courseNames: getCourseNamesForSubject(this.state.subject),
          courses: courses.default[this.state.subject].courses
        });
      }
    });
  }

  addCourse = () => {
    console.log('adding course in input form');
    const { selectedCourse } = this.state;
    this.state.courses.map(course => {
      if (course.courseID === selectedCourse) {
        this.props.addCourse(course);
      }
    });
  }

  render() {
    return(
      <InputFormContainer>
        <DropdownInput
          options={staticData.quarters}
          value={this.state.quarter}
          labelText="Select Quarter"
          name="quarter"
          handleChange={this.handleChange}
        />
        <DropdownInput
          options={this.state.subjects}
          value={this.state.subject}
          labelText="Select Subject"
          name="subject"
          handleChange={this.handleChange}
        />

        <DropdownInput
          options={this.state.courseNames}
          value={this.state.selectedCourse}
          labelText="Select Course"
          name="selectedCourse"
          handleChange={this.handleChange}
        />
        <Button
          disabled={false}
          showButton={true}
          onClick={this.addCourse}
          text="Add Course"
        />
      </InputFormContainer>
    );
  }
}

export default InputForm;

const getCourseNamesForSubject = (subject) => {
  return courses.default[subject].courses.map(course => {
    return course.courseID;
  })
}

const getSubjects = () => {
  return Object.keys(courses.default);
}
