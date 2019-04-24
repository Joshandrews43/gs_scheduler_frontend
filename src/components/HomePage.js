import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm' ;
import SelectedCourses from './SelectedCourses' ;

class HomePage extends Component {
  state = {
    selectedCourses: []
  }

  onCourseSelected = (e) => {
    const courseName = e.target.value;
    this.setState({
      selectedCourses: this.state.selectedCourses.append(courseName)
    })
  }

  render() {
    return (
      <>
        <InputForm 
          onCourseSelected={this.onCourseSelected}
        />

        <SelectedCourses
          courses={this.state.selectedCourses}
        />
      </>
    );
  }
}

export default HomePage;
