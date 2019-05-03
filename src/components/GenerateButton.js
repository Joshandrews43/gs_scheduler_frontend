import React, {Component} from 'react';
import styled from 'styled-components';
import Button from './Button';



const GenerateButtonContainer = styled.div`
  display: ${props=> props.showButton ? 'block': 'none'};
  margin: 0 auto;
  flex-direction: column;
  width: 300px;
`;



class GenerateButton extends Component {
  state = {
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

      <GenerateButtonContainer
        showButton={this.state.showButton}
      >
        <Button
          disabled={false}
          onClick={this.onClick}
          text="Generate Schedule"
        />
      </GenerateButtonContainer>
    )
  }
}
  export default GenerateButton;
