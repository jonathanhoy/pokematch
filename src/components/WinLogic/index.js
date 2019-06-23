import React, { Component } from 'react';
import Swal from 'sweetalert2'

class WinLogic extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      matches: 0,
      difficulty: 0,
      attempts: 0
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        data: this.props.data,
        matches: this.props.matches,
        difficulty: this.props.difficulty,
        attempts: this.props.attempts
      });
    };
    if (prevState !== this.state && this.state.matches !== 0 && this.state.matches === this.state.difficulty) {
      Swal.fire({
        title: "Congrats bro",
        text: `You did it in ${this.state.attempts} attempts. Nice!`,
      });
    } 
  }
  render() {
    return null;
  }
}

export default WinLogic;