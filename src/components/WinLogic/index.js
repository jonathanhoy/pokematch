import React, { Component } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../firebase';

class WinLogic extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      matches: 0,
      difficulty: 0,
      attempts: 0,
      region: 'kanto',
      name: '',
      victory: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        data: this.props.data,
        matches: this.props.matches,
        difficulty: this.props.difficulty,
        attempts: this.props.attempts,
        victory: this.props.victory
      });
    };
    if (prevState !== this.state && this.state.matches !== 0 && this.state.matches === this.state.difficulty && this.state.victory === false) {
      this.setState({
        victory: true
      })
      Swal.fire({
        title: "Congratulations!",
        text: `You did it in ${this.state.attempts} attempts. Nice!`,
        confirmButtonColor: '#ee1515',
        allowOutsideClick: false
      });
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    const leaderboardEntry = {
      name: this.state.name,
      score: this.state.attempts
    };
    dbRef.push(leaderboardEntry);
  }

  render() {
    return (
      <div>
        {this.state.victory === true && (
          <div>
            <h1>VICTORY!</h1>
            <form action="" onSubmit={this.handleSubmit}>
              <label htmlFor="">name</label>
              <input id="name" type="text" value={this.state.name} onChange={this.handleChange}/>
              <button>submit</button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

export default WinLogic;