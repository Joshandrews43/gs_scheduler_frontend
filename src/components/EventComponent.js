import React from 'react';
import styled from 'styled-components';

const Event = styled.div`
  position: relative;
  overflow: hidden;
  width: 114px;
  height: 98%;
  padding: 5px;
  color: white;
  background-color: rgba(0, 54, 96, 0.9);
`;

class EventComponent extends React.PureComponent {
  render() {
    const {
      start,
      end,
      value,
    } = this.props;
    return (
      <Event>
        <span>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>
        <br /><br />
        {value}
      </Event>
    );
  }
}

export default EventComponent;
