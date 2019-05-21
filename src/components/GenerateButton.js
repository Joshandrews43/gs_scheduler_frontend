import React, { Component } from 'react';
import styled from 'styled-components';
import Button from "./Button.js";

const GenerateContainer = styled.div`
    display: ${props => props.displayButton ? 'block' : 'none'}

    width: 100%;
    margin: 0 auto;
`;

export default class GenerateButton extends Component{

  render() {
    return (
      <GenerateContainer displayButton={this.props.displayButton}>
      <Button
        onClick={this.props.onClick}
        text = "Generate schedule"
       />
       </GenerateContainer>
    );
  }
}
