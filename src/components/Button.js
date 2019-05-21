import React, {Component} from 'react';
import styled from 'styled-components';

const GradientButton = styled.button`
  background-color: #003660;
	transition: 0.5s;
	background-size: 200% auto;
  height: 50px;
  width: 200px;
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
    >
      {props.text}
    </GradientButton>
  );
}

export default Button;
