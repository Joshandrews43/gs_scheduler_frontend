import React, { Component } from 'react';
import styled from 'styled-components';
import Button from "./Button.js";
import ReactLoading from 'react-loading';

const GenerateContainer = styled.div`
    width: 100%;
    margin: 0 auto;
`;

const Loader = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);

export default class GenerateButton extends Component{

  render() {
    const { loading } = this.props;
    return (
      <GenerateContainer>
      {
        !loading ?
          (<Button
            onClick={this.props.onClick}
            text="Generate schedule"
           />)
           :
           <Loader type={'spin'} color={'black'} />
      }

       </GenerateContainer>
    );
  }
}
