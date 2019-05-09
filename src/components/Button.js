import React, {Component} from 'react';
import styled from 'styled-components';
const GradientButton = styled.button`
  background-color: #003660;
	transition: 0.5s;
  display: ${props => props.showButton ? 'block' : 'none'}
	background-size: 200% auto;
  height: 50px;
  width: 100%;
  border-radius:50px;
  font-size: 16px;
  color: white;
  &:hover {
    background-position: right center;
  }
  &:active {
    background-position: top left;
  }
`;


function Button(props) {
  return (
    <GradientButton
      disabled={props.disabled || false}
      onClick={props.onClick}
      showButton={props.showButton}
    >
      {props.text}
    </GradientButton>
  );
}

export default Button;
