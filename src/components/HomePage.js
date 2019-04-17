import React, { Component } from 'react';
import styled from 'styled-components';
import DropdownInput from './DropdownInput'

class HomePage extends Component {
  render() {
    return (
      <DropdownInput
        options={testDropdownProps}
      />
    );
  }
}

export default HomePage;


const testDropdownProps = [{value: 'Spring'}, {value: 'Fall'}, {value: 'Winter'}, {value: 'Summer'}];
