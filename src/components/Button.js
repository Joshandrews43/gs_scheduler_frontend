import React, {Component} from 'react';
import styled from 'styled-components';

const GradientButton = styled.button`
  background-image: linear-gradient(to right, #FCA5F1 0%, #B5FFFF 51%, #FCA5F1 100%);
	transition: 0.5s;
	background-size: 200% auto;
  height: 50px;
  width: 100%;
  border-radius:50px;
  font-size: 16px;
  color: black;
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
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.text}
    </GradientButton>
  );
}

export default Button;