import React, { Component } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../firebase';

class SubmitForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      score: 0,
      region: "",
      database: []
    }
  }

  // the idea is to store a database locally in which future high score submissions would get compared to and somehow reject duplicate entries
  // componentDidMount() {
  //   const dbRef = firebase.database().ref();
  //   dbRef.on('value', (response) => {
  //     const newState = [];
  //     const data = response.val();
  //     for (let key in data) {
  //       newState.push(data[key]);
  //     }
  //     const test = Object.entries(newState[0])
  //     console.log(test);
      
  //     this.setState({
  //       database: newState
  //     });
  //   });
  // }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        score: this.props.attempts,
        region: this.props.region,
        difficulty: this.props.difficulty
      });
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const node = this.state.region;
    let difficulty = '';
    if (this.state.difficulty == 6) {
      difficulty = 'easy';
    } else if (this.state.difficulty == 8) {
      difficulty = 'medium';
    } else if (this.state.difficulty == 10) {
      difficulty = 'hard';
    };
    const dbRef = firebase.database().ref(`${node}/${difficulty}`);
    const leaderboardEntry = {
      name: this.state.name,
      score: this.state.score
    };
    dbRef.push(leaderboardEntry);
  }

  render() {
    return (
      this.props.victory === true && (
        <div>
          <h1>VICTORY!</h1>
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="">name</label>
            <input id="name" type="text" value={this.state.name} onChange={this.handleChange} />
            <button>submit</button>
          </form>
        </div>
      )
    )
  }
}

export default SubmitForm;