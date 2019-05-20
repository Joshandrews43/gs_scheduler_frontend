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
  display: ${props => props.displayForm ? 'block' : 'none'}
`;

class InputForm extends Component {
  state = {
    subject: '',
    quarter: '',
    selectedCourse: '',
    buttonDisabled: false, //i changed the value of this from true to false so thats its not disabled as default state
    subjects: [],
    quarters: [],
    courses: [],
  }

  getCourseNamesForSubject = (subject) => { //put function inside
    if (!courses.default[subject].courses){
      this.setState({buttonDisabled: true}) ; //if its just the No Courses tab in the array, this is supposed to disable the button.
      return ["No courses"] ;
    }

    this.setState({ buttonDisabled: false });
    return courses.default[subject].courses.map(course => {
      return course.courseID;
    })
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
          courseNames: this.getCourseNamesForSubject(this.state.subject),
          courses: courses.default[this.state.subject].courses
        });
      }
    });
  }

  addCourse = () => {
    const { selectedCourse } = this.state;
    this.state.courses.map(course => {
      if (course.courseID === selectedCourse) {
        this.props.addCourse(course);
      }
    });
}

  render() {
    return(
      <InputFormContainer displayForm={this.props.displayForm}>
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
          disabled={this.state.buttonDisabled} //now disabled will be set to whatever the state of buttonDisabled is set to
          onClick={this.addCourse}
          text="Add Course"
        />
      </InputFormContainer>
    );
  }
}

export default InputForm;



const getSubjects = () => {
  return Object.keys(courses.default);
}
