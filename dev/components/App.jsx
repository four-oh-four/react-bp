import React from 'react';

import Counter from './Counter.js';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Show off!</h1>
	   <Counter />
      </div>
	 );
  }
}
