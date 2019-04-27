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
    this.state.courses.map(course => {
      if (courseToDelete === course) {
        var arr1 = course.slice(0,courseToDelete) ;
        var arr2 = course.slice(courseToDelete, course.length) ;
        course = arr1.concact(arr2) ;
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
