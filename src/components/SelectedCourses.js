import React, {Component} from 'react';
import styled from 'styled-components';

const CourseContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

class SelectedCourses extends Component{
    constructor(props){
        super(props);

        this.state = {
            output: 'output'
        }
        this.handleChange=this.handleChange.bind(this) ;
    }

    handleChange(event){
        const name = this.target.name 
        const value = this.target.value
        this.setState({[name]: value} )
    }

    render(){
        return(
        <CourseContainer>
            <SelectedCourses
            value= {this.state.output}
            labelText="courses" 
            />
        </CourseContainer>
        )
    }


}

export default SelectedCourses;