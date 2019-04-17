import React, {Component} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class DropdownInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: ''
    }
  }

  handleChange(event) {
    console.log(event.name);
  }

  renderMenuItems() {
    return this.props.options.map(option => (
      <MenuItem value={option.value}>{option.value}</MenuItem>
    ));
  }

  render() {
    return(
      <Select
        autoWidth={true}
        value={this.state.selected}
        onChange={this.handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {this.renderMenuItems()}
      </Select>
    );
  }
}

export default DropdownInput;
