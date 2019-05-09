import React, {Component} from 'react' ;
import styled from "styled-components" ;
import { Tab } from '@material-ui/core';

const TableContainer = styled.div `
width: 500px,
border: 1px solid black;
`;

class ScheduleTable extends Component{
    render(){
        return(
            <TableContainer>
            <table align="center">
            <caption>Schedule</caption>
            <tr>
                <th>Time</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
            </tr>
            <tr>
                <th>8am</th>
            </tr>
            <tr>
                <th>9am</th>
            </tr>
            <tr>
                <th>10am</th>
            </tr>
            <tr>
                <th>11am</th>
            </tr>
            <tr>
                <th>12pm</th>
            </tr>
            <tr>
                <th>1pm</th>
            </tr>
            <tr>
                <th>2pm</th>
            </tr>
            <tr>
                <th>3pm</th>
            </tr>
            <tr>
                <th>4pm</th>
            </tr>
            <tr>
                <th>5pm</th>
            </tr>
            <tr>
                <th>6pm</th>
            </tr>
            <tr>
                <th>7pm</th>
            </tr>
            <tr>
                <th>8pm</th>
            </tr>
            <tr>
                <th>9pm</th>
            </tr>
            <tr>
                <th>10pm</th>
            </tr>
            <tr>
                <th>11pm</th>
            </tr>


            </table>
            </TableContainer>
        )
    }


}

export default ScheduleTable ;
