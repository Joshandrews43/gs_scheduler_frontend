import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm' ;
import SelectedCourses from './SelectedCourses' ;
import Title from './Title' ;
import ScheduleTable from './ScheduleTable' ;

import '../styles/reset.css';
import '../styles/global.css';

const Container = styled.div`
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  height: 100vh;
`;

const MiddleContainer = styled.div`
  width: 100%;
  justify-content: space-evenly;
`;

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
      <Container className="flex-column flex-full-center">
        <Title/>
        <MiddleContainer className="flex-row">
          <InputForm
            addCourse={this.addCourse}
          />
          <ScheduleTable/>

          <SelectedCourses
            courses={selectedCourses}
            deleteCourse={this.deleteCourse}
          />
        </MiddleContainer>
      </Container> 
    );
  }
}

export default HomePage;
