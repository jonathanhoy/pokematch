import React, { Component } from 'react';
import Swal from 'sweetalert2'

class WinLogic extends Component {
  constructor() {
    super();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.difficulty === this.props.matches) {
        setTimeout(() => {
          Swal.fire({
            title: "Congrats bro"
          });
        }, 600);
      }
    };
  }
  render() {
    return null;
  }
}

export default WinLogic;