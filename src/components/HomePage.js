import React, { Component } from 'react';
import styled from 'styled-components';
import DropdownInput from './DropdownInput'

class HomePage extends Component {
  render() {
    return (
      <>
        <DropdownInput
          options={quarters}
          labelText="Select Quarter"
          name="Quarter"
        />
        <DropdownInput
          options={subjects}
          labelText="Select Subject"
          name="Subject"
        />
      </>
    );
  }
}

export default HomePage;
const subjects = [{value: 'Math'}, {value: 'History'}, {value: 'Computer Science'}];
const quarters = [ {value: 'Fall'}, {value: 'Winter'}, {value: 'Spring'}, {value: 'Summer'}];
