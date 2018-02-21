import React, { Component } from 'react';
import { string, object } from 'prop-types'

export default class Button extends Component {
  render() {
    return (
      <div className="clickable" style={this.props.style} onClick={this.props.handleClick}>
        <p>
          {this.props.title}
        </p>
      </div>
    );
  }
}

Button.defaultProps = {
  title: "OK",
  style: {
    width: '50%',
    height: '80px',
    border: '1px solid silver',
    borderRadius: '15px',
    fontSize: '24px',
    margin: '15px',
    textAlign: 'center',
    backgroundColor: '#3e4eb8',
    color: 'white',
  },
  onClick: ()=>{}
}
