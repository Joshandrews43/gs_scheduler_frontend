import React, {Component} from 'react';
import styled from 'styled-components';
import DropdownInput from './DropdownInput';
import Button from './Button';
const staticData = require('../assets/staticData.json');

const InputFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

class InputForm extends Component {
    state = {
      subject: '',
      quarter: '',
      course: '',
      buttonDisabled: true,
    }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value}, () => {
      if (this.state.subject && this.state.quarter) this.setState({buttonDisabled: false});
    });


  }

  onSubmit = () => {
    // do something with state here.
    console.log(this.state)
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
          options={staticData.quarters}
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
        <Button
          disabled={this.state.buttonDisabled}
          onClick={this.onSubmit}
          text="Generate Schedules"
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
