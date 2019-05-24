import React from 'react';
import styled from 'styled-components';
import { getRequest } from '../helpers/util.js';



const Container = styled.div`
  display: ${props => props.displayFilters ? 'block' : 'none'}
  width: 200px;
  border: 1px solid black;
  min-height: 325px;
`;

const FilterContainer = styled.div`
  margin-bottom: 30px;
`;

const FilterType = styled.div`
  font-size: 22px;
`;

const ApplyFiltersButton = props => {
  return (
    <button onClick={props.applyFilters}>Apply Filters</button>
  );
}

const Filter = props => (
  <div className="flex-column" style={{minHeight: '50px'}}>
    <input name={props.name} type="radio" key={props.name} value={props.value} onChange={props.onFilterSelect}/>
    <label htmlFor={props.name} style={{minWidth: '90px', maxWidth: '90px'}}>{props.value}</label>
  </div>
);

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

  renderFilterOptions = (type, options, onChange) => {
    return options.map(option => {
      return <Filter name={type} key={option} value={option} onFilterSelect={onChange}/>
    });
  }

  renderFilters = () => {
    return this.state.filters.map(filter => {
      return (
        <FilterContainer className="flex-column">
          <FilterType>{filter.type}</FilterType>
          <div className="flex-row" style={{flexWrap: 'wrap'}}>
            {this.renderFilterOptions(filter.type, filter.options, this.props.onFilterSelect)}
          </div>
        </FilterContainer>
      )
    })
  }

  render() {
    const {
      displayFilters,
      applyFilters
    } = this.props;

    return (
      <Container displayFilters={displayFilters}>
        {this.renderFilters()}
        <ApplyFiltersButton applyFilters={applyFilters}/>
      </Container>
    );
  }
}
