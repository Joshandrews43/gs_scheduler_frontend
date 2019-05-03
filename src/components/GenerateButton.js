import React, {Component} from 'react';
import styled from 'styled-components';
import Button from './Button';



const GenerateButtonContainer = styled.div`
  //display: ${props=> props.showButton ? 'block': 'none'};
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  width: 300px;
`;


class GenerateButton extends Component {
  state ={
    buttonDisabled: true,
    showButton: true,
  }
  onClick = () => {
     this.setState({
       showButton: false,
     })
   }

  render(){
    return(

      <GenerateButtonContainer>
      <Button
        disabled={false}
        showButton={this.state.showButton}
        onClick={this.onClick}
        text="Generate Schedule"
      />
      </GenerateButtonContainer>
    )
  }
}
  export default GenerateButton;
