'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.png';
import './search.less';

class Search extends React.Component {

  render() {
    return <div className="search-text">
      搜索文字的内容<img src={logo} />
      <div className="test-1"></div>
      <div className="test-2"></div>
    </div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
);