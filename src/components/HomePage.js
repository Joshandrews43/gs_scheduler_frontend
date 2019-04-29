import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm' ;
import SelectedCourses from './SelectedCourses' ;

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



  render() {
    const { selectedCourses } = this.state;
    return (
      <>
        <InputForm
          addCourse={this.addCourse}
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
