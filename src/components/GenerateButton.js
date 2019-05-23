import React, { Component } from 'react';
import styled from 'styled-components';
import Button from "./Button.js";

const GenerateContainer = styled.div`
    width: 100%;
    margin: 0 auto;
`;

export default class GenerateButton extends Component{

  render() {
    return (
      <GenerateContainer >
      <Button
        onClick={this.props.onClick}
        text="Generate schedule"
       />
       </GenerateContainer>
    );
  }
}
