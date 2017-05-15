import React from 'react';
import Counter from './counter.js';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <Counter/>
      </div>);
  }
}
