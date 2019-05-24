import React, {Component} from 'react';
import styled from 'styled-components';

import Close from '../assets/close.svg';

const CoursesContainer = styled.div`
  width: 100%;
  max-width: 940px;
  flex-wrap: wrap;
  position: relative;
  left: 100px;
`;

const Course = styled.div`
  color: #003660;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  border: 1px solid black;
  border-radius: 30px;
  padding: 0 30px;
  margin-bottom: 30px;
  min-height: 50px;
`;

const Delete = styled.img`
  width: 15px;
  height: 15px;
`;

class SelectedCourses extends Component {
    renderCourses = () => {
        const { courses } = this.props;
        return courses.map(course => (
            <Course
              key={course.courseID}
            >
              {this.formatCourse(course)}
              <Delete
                  src={Close}
                  onClick={() => this.props.deleteCourse(course)}
              />
            </Course>
        ))
    }

    formatCourse = (course) => {
        return `${course.courseID}: ${course.fullTitle}`;
    }

    render(){
        return(
            <CoursesContainer className="flex-row">
                {this.renderCourses()}
            </CoursesContainer>
        );
    }
}

export default SelectedCourses;
