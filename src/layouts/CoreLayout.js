import React from 'react';
import 'styles/core.scss';

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  render () {
    return (
      <div className='page-container'>
        <div className='view-container'>
          {this.props.children}
        </div>
        <footer className="container">
          <div className="col-sm-4">Created by <a href="http://nojaf.com">nojaf</a></div>
          <div className="col-sm-4">Press <code>ctrl + q</code> to change the redux tools</div>
          <div className="col-sm-4">Press <code>ctrl + h</code> to toggle the redux tools</div>
        </footer>
      </div>
    );
  }
}
