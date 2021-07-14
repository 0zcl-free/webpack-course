'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.png';
import './search.less';
import { kaimo666 } from './tree-shaking.js';
if (false) {
  console.log('abcd')
  kaimo666();
}
class Search extends React.Component {

  constructor() {
    super()
    this.state = {
      Text: null
    }
  }

  loadComponent() {
    import('./text').then(Text => {
      console.log(Text);
      this.setState({
        Text: Text.default
      })
    })
  }

  render() {
    console.log('abc')
    const kaimo = kaimo666()
    const { Text } = this.state
    return <div className="search-text">
      搜索文字的内容{ kaimo } { Text ? <Text /> : null }
      <img src={logo} onClick={ this.loadComponent.bind(this) } />
      <div className="test-1"></div>
      <div className="test-2"></div>
    </div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
);