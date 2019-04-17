import React, {Component} from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const InputContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;

class DropdownInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.name
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({selected: event.target.value})
  }

  renderMenuItems() {
    return this.props.options.map(option => (
      <MenuItem
        value={option.value}
        key={option.value}
      >
        {option.value}
      </MenuItem>
    ));
  }

  render() {
    return(
      <InputContainer>
        <label for={this.props.name}>{this.props.labelText}</label>
        <Select
          autoWidth
          name={this.props.name}
          autoWidth={true}
          value={this.state.selected}
          onChange={this.handleChange}
        >
          {this.renderMenuItems()}
        </Select>
      </InputContainer>
    );
  }
}

export default DropdownInput;
