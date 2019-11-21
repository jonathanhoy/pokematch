import React, { Component } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../firebase';
import SubmitForm from '../SubmitForm';

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
      victory: false,
      threshold: 0
    }
  }

  componentDidMount() {
    this.setState({
      victory: this.props.victory
    });
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState !== this.state &&
      this.state.matches !== 0 &&
      this.state.matches === this.state.difficulty &&
      this.state.victory === false) {
      this.setState({
        victory: true,
        matches: 0
      });
      Swal.fire({
        title: "Congratulations!",
        text: `You did it in ${this.state.attempts} attempts. Nice!`,
        confirmButtonColor: '#ee1515',
        allowOutsideClick: false
      });
    };


    if (prevProps !== this.props) {
      const dbRef = firebase.database().ref(`${this.props.region}/${this.props.difficulty == 6 && 'easy' || this.props.difficulty == 8 && 'medium' || this.props.difficulty == 10 && 'hard'}`);
      dbRef.on('value', (response) => {
        const newState = [];
        const data = response.val();
        for (let key in data) {
          newState.push(data[key]);
        }
        const threshold = newState.length >= 5 ? Object.values(newState).sort((a, b) => (a.score > b.score || a.timestamp < b.timestamp) ? 1 : -1)[4].score : null;
        this.setState({
          threshold
        });
      });
      this.setState({
        data: this.props.data,
        matches: this.props.matches,
        difficulty: this.props.difficulty,
        attempts: this.props.attempts,
        region: this.props.region
      });
    };
  }

  render() {
    return (
      <React.Fragment>
        {
          (this.state.threshold === null || this.props.attempts <= this.state.threshold) ? (
            <SubmitForm
              victory={this.state.victory}
              attempts={this.state.attempts}
              region={this.state.region}
              difficulty={this.state.difficulty} />
          ) : null
        }
      </React.Fragment>
    )
  }
}

export default WinLogic;