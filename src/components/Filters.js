import React from 'react';
import styled from 'styled-components';
import { getRequest } from '../helpers/util.js';



const Container = styled.div`
  display: ${props => props.displayFilters ? 'block' : 'none'}
`;

const Checkbox = props => (
  <input type="checkbox" {...props} />
);

const FilterContainer = styled.div`

`;

const FilterType = styled.div`

`;

const FilterOption = styled.div`

`;

export default class FilterSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      selectedFilters: []
    }
    this.populateFilters();
  }

  populateFilters = () => {
    getRequest('/api/v1/general')
    .then(res => {
      const filters = res.filters;
      this.setState({
        filters: filters
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  renderFilters = () => {
    this.state.filters.map(filter => {
      console.log(filter);
      return (
        <FilterContainer>
          <FilterType />
        </FilterContainer>
      )
    })
  }

  render() {
    const {
      displayFilters,
    } = this.props;

    return (
      <Container displayFilters={displayFilters}>
        {
          this.renderFilters()
        }
      </Container>
    );
  }
}
