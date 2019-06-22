// MatchLogic

import React, { Component } from 'react';

class MatchLogic extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      data: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const arr = [...this.props.activePair];
      this.setState({
        cards: [...arr],
        data: this.props.data
      });
    };
    this.compareCards();
  }

  compareCards = () => {
    // if (this.state.cards.length === 2) {
    //   setTimeout(function () {
    //     alert("Hello");
    //   }, 750);
    // }
  }

  render() {
    return null; // pass matched pairs to new component?
  }
}

export default MatchLogic;