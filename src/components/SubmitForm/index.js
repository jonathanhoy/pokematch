import React, { Component } from 'react';
import firebase from '../../firebase';

const date = new Date();

class SubmitForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      score: 0,
      region: "",
      database: [],
      leaderboard: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        score: this.props.attempts,
        region: this.props.region,
        difficulty: this.props.difficulty,
      });
      this.submitHighscore();
    };
  }

  submitHighscore = () => {
    // eslint-disable-next-line
    const dbRef = firebase.database().ref(`${this.props.region}/${this.props.difficulty == 6 && 'easy' || this.props.difficulty == 8 && 'medium' || this.props.difficulty == 10 && 'hard'}`);
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push(data[key]);
      }
      this.setState({
        leaderboard: newState
      });
    });
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
    // eslint-disable-next-line
    if (this.state.difficulty == 6) {
      difficulty = 'easy';
      // eslint-disable-next-line
    } else if (this.state.difficulty == 8) {
      difficulty = 'medium';
      // eslint-disable-next-line
    } else if (this.state.difficulty == 10) {
      difficulty = 'hard';
    };
    const dbRef = firebase.database().ref(`${node}/${difficulty}`);
    const leaderboardEntry = {
      name: this.state.name,
      score: this.state.score,
      timestamp: date.getTime()
    };
    dbRef.push(leaderboardEntry);
    this.setState({
      name: '',
      score: 0,
    });
  }

  render() {
    return (
      this.props.showSubmissionForm === true ? (
        <div className="submit-form">
          <h2 className="submit-form__heading">High score! Get on the leaderboard!</h2>
          <form className="submit-form__form" action="" onSubmit={this.handleSubmit}>
            <label htmlFor="">Name</label>
            <input className="submit-form__input" id="name" type="text" value={this.state.name} onChange={this.handleChange} />
            <button className="submit-form__button">Confirm</button>
          </form>
        </div>
      ) : null
    )
  }
}

export default SubmitForm;