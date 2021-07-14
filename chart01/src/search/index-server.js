const React = require('react');
const logo = require('./images/logo.png');
const s = require('./search.less');
import '../../common/index/index.js';
console.log('s', s)

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      Text: 'hello ssr'
    }
  }

  render() {
    return <div className="search-text">
      凯小默的博客666
      <img src={ logo.default } />
    </div>
  }
}

module.exports = <Search />;
