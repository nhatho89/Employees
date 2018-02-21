import React, { Component } from 'react';

export default class Icon extends Component {

  render() {
    return (
      <span style={styles.iconContainer} className="fa-stack fa-2x clickable" onClick={this.props.handleClick}>
        <i style={styles.outerIcon} className="fa fa-circle fa-stack-2x"></i>
        <i style={styles.insideIcon} className={"fa " + this.props.icon + " fa-stack-1x"}></i>
      </span>
    );
  }
}

const styles = {
  outerIcon: {
    color: '#3e4eb8'
  },
  insideIcon: {
    color: 'white',
    fontSize: '28px'
  }
}
