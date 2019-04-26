import React, {Component} from 'react';
import styled from 'styled-components';
import DropdownInput from './DropdownInput';
const staticData = require('../assets/staticData.json');

const InputFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: 'Subject',
      quarter: 'Quarter',
      course: 'Course' ,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  onCourseSelected = (e) => {
    const courseName = e.target.value;
    var courseObject;
    courses.map(course => {
      if(courseName === course.name){
        courseObject = course;
      }
    });
    this.props.onCourseSelected(courseObject);
  }

  render() {
    return(
      <InputFormContainer>
        <DropdownInput
          options={quarters}
          value={this.state.quarter}
          labelText="Select Quarter"
          name="quarter"
          handleChange={this.handleChange}
        />
        <DropdownInput
          options={getSubjectSymbols()}
          value={this.state.subject}
          labelText="Select Subject"
          name="subject"
          handleChange={this.handleChange}
        />
        <DropdownInput
          options={getOptions()}
          value={''}
          labelText="Select Course"
          name="course"
          handleChange={this.onCourseSelected}
        />
      </InputFormContainer>
    );
  }
}

const courses = [{name: 'test1', time: '8pm'}, {name: 'test2', time: '9pm'}]

function getOptions() {
  return courses.map(course => {
    return course.name;
  })
}

export default InputForm;
const getSubjectSymbols = () => {
  return staticData.subjects.map(subject => (subject.symbol));
}


const quarters = ['Fall', 'Winter', 'Spring', 'Summer'];
