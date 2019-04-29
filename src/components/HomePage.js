import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm' ;
import SelectedCourses from './SelectedCourses' ;

class HomePage extends Component {
  state = {
    selectedCourses: [{name: "test", time: '8:00 - 9:00'}]
  }

  onCourseSelected = (course) => {
    const { selectedCourses } = this.state;

    this.setState({
      selectedCourses: selectedCourses.concat(course)
    })
  }

  deleteCourse = (courseToDelete) => {
    const { selectedCourses } = this.state;
    selectedCourses.map((course, index) => {
      if (courseToDelete === course) {
        const newCourses = selectedCourses.slice(0, index).concat(selectedCourses.slice(index + 1, selectedCourses.length))
        this.setState({ selectedCourses: newCourses });
      }
    })
  }

  render() {
    const { selectedCourses } = this.state;
    return (
      <>
        <InputForm 
          onCourseSelected={this.onCourseSelected}
        />

        <SelectedCourses
          courses={selectedCourses}
          deleteCourse={this.deleteCourse}
        />
      </>
    );
  }
}

export default HomePage;
