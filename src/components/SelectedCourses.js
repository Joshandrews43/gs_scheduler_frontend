import React, {Component} from 'react';
import styled from 'styled-components';

const CoursesContainer = styled.div`
    width: 300px;
    float: right;
`;

const Course = styled.div`
    width: 100%;
    border: 1px solid black;
`;

const Delete = styled.div`
    background-color: red;
    float: right;
    width: 20px;
    height: 20px;
`;

class SelectedCourses extends Component {
    renderCourses = () => {
        const { courses } = this.props;
        return courses.map(course => (
            <Course>
                {this.formatCourse(course)}
                <Delete
                    onClick={() => this.props.deleteCourse(course)}
                />
            </Course>
        )) 
    }

    formatCourse = (course) => {
        return course.name + " " + course.time;
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