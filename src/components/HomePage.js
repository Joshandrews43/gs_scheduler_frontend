import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm' ;
import SelectedCourses from './SelectedCourses' ;
import Button from './Button';

const GenerateButtonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
`;

class HomePage extends Component {
state = {
    generateButtonDisabled: false,
    showGenerateButton: true,
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
    this.setState({
      generateButtonDisabled: true,
      showGenerateButton: false,
     })
  }


  render() {
    const { selectedCourses } = this.state;
    return (
      <>
        <InputForm
          addCourse={this.addCourse}
        />

        <GenerateButtonContainer>
        <Button
          disabled={this.state.generateButtonDisabled}
          onClick={this.onGenerateClicked}
          showButton={this.state.showGenerateButton}
          text="Generate Schedules"
        />
        </GenerateButtonContainer>
        <SelectedCourses
          courses={selectedCourses}
          deleteCourse={this.deleteCourse}
        />
      </>
    );
  }
}

export default HomePage;
