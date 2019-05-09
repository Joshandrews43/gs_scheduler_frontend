import React, {Component} from 'react';
import styled from 'styled-components';

import Close from '../assets/close.svg';

const CoursesContainer = styled.div`
  width: 300px;
  float: right;
`;

const Course = styled.div`
color: #003660 ;
display: flex;
justify-content: space-between;
align-items: center;
width: calc(100% - 60px);
border: 1px solid #003660;
border-radius: 3px;
padding: 0 30px;
margin-bottom: 5px;
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
            <Course>
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
            <CoursesContainer>
                {this.renderCourses()}
            </CoursesContainer>
        );
    }
}

export default SelectedCourses;
