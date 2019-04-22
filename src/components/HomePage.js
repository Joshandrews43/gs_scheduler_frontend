import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm'

class HomePage extends Component {

  onCourseSelected = (e) => {
    const courseName = e.target.value;
    console.log(courseName);
  }

  render() {
    return (
      <>
        <InputForm 
          onCourseSelected={this.onCourseSelected}
        />
      </>
    );
  }
}

export default HomePage;
