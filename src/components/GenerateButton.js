import React, { Component } from 'react';
import styled from 'styled-components';

const GenerateContainer = styled.div`
    width = 300px ;
`;

export default class GenerateButton extends Component{

  render() {
    return (
      <button onClick={this.props.onClick} />
    );
  }
}
