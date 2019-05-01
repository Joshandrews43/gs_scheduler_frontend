import React, { Component } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm' ;
import SelectedCourses from './SelectedCourses' ;
import Title from './Title' ;

const BStyle = styled.div`
background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
position: fixed ;
top: 0 ;
left: 0 ;
bottom: 0 ;
right: 0 ;
min-width: 100% ;
min-height: 100% ;
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
      <BStyle>
        <Title/>
        <InputForm
          addCourse={this.addCourse}
        />

        <SelectedCourses
          courses={selectedCourses}
          deleteCourse={this.deleteCourse}
        />
      </BStyle>
    );
  }
}

export default HomePage;
