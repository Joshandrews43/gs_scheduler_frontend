import React, {Component} from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 30px;
`;

class DropdownInput extends Component {
  renderMenuItems() {
    const { options } = this.props;
    if (!options) {
      return null;
    }

    return this.props.options.map(option => (
      <MenuItem
        value={option}
        key={option}
      >
        {option}
      </MenuItem>
    ));
  }

  render() {
    return(
      <InputContainer>
        <label htmlFor={this.props.name}>{this.props.labelText}</label>
        <Select
          autoWidth
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
        >
          {this.renderMenuItems()}
        </Select>
      </InputContainer>
    );
  }
}

export default DropdownInput;
