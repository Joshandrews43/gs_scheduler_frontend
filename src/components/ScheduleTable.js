import React, {Component} from 'react' ;
import styled from "styled-components" ;
import { Tab } from '@material-ui/core';

const TableContainer = styled.div `
  width: 500px,
  border: 1px solid black;
`;

const Row = styled.tr`

`;

const TableHeading = styled.th`
  padding: 5px 10px;
`;

const TableEntry = styled.td`
  padding: 5px 10px;
  text-align: center;
  border: 1px solid grey;
`;


class ScheduleTable extends Component{

    generateTimes = () => {
      var times = [];
      for (var i = 8; i < 12; i++) {
        times.push(`${i}am`);
      }
      times.push('12pm');
      i = 1;
      while (i <= 11) {
        times.push(`${i}pm`);
        i++;
      }


      return times.map(time => (
        <Row>
          <TableEntry>{time}</TableEntry>
          <TableEntry>Monday</TableEntry>
          <TableEntry>Tuesday</TableEntry>
          <TableEntry>Wednesday</TableEntry>
          <TableEntry>Thursday</TableEntry>
          <TableEntry>Friday</TableEntry>
        </Row>
      ))
    }

    render(){
        return(
            <TableContainer>
            <table align="center">
            <caption>Schedule</caption>
            <tbody>
              <Row>
                  <TableHeading>Time</TableHeading>
                  <TableHeading>Monday</TableHeading>
                  <TableHeading>Tuesday</TableHeading>
                  <TableHeading>Wednesday</TableHeading>
                  <TableHeading>Thursday</TableHeading>
                  <TableHeading>Friday</TableHeading>
              </Row>
              {this.generateTimes()}
              </tbody>
            </table>
            </TableContainer>
        )
    }


}

export default ScheduleTable ;
