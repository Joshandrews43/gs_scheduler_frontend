import React, {Component} from 'react';
import styled from 'styled-components';
import DropdownInput from './DropdownInput';
import Button from './Button';
const staticData = require('../assets/staticData.json');

const InputFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      quarter: '',
      buttonDisabled: true,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value}, () => {
      if (this.state.subject && this.state.quarter) this.setState({buttonDisabled: false});
    });


  }

  onSubmit() {
    // do something with state here.
    console.log(this.state)
  }

  render() {
    return(
      <InputFormContainer>
        <DropdownInput
          options={staticData.quarters}
          value={this.state.quarter}
          labelText="Select Quarter"
          name="quarter"
          handleChange={this.handleChange}
        />
        <DropdownInput
          options={getSubjectSymbols()}
          value={this.state.subject}
          labelText="Select Subject"
          name="subject"
          handleChange={this.handleChange}
        />
        <Button
          disabled={this.state.buttonDisabled}
          onClick={this.onSubmit}
          text="Generate Schedules"
        />
      </InputFormContainer>
    );
  }
}

export default InputForm;


const getSubjectSymbols = () => {
  return staticData.subjects.map(subject => (subject.symbol));
}
