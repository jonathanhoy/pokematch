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
      threshold: 0,
      victory: false,
      showSubmissionForm: false
    }
  }

  componentDidMount() {
    // CURRENT ISSUE: THIS IS BOUND TO WHEN THE COMPONENT MOUNTED AND DOES NOT UPDATE WHEN THE REGION OR DIFFICULTY IS CHANGED.
    const dbRef = firebase.database().ref(`${this.props.region}/${this.props.difficulty == 6 && 'easy' || this.props.difficulty == 8 && 'medium' || this.props.difficulty == 10 && 'hard'}`);
    dbRef.on('value', (response) => {
      this.setState({
        showSubmissionForm: false
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps !== this.props &&
      this.props.difficulty > 0 &&
      this.props.matches > 0 &&
      this.props.matches === this.props.difficulty
      ) {
        this.setState({
          matches: 0,
          victory: true,
          // showSubmissionForm: true
        });
      };

    if (
      prevState.victory !== this.state.victory &&
      this.state.victory === true &&
      prevProps === this.props
      ) {
        this.victorySwal();
        if (this.state.threshold === null || this.props.attempts <= this.state.threshold) {
          this.setState({
            showSubmissionForm: true
          })
        }
      };

    if (prevProps !== this.props) {
      this.calculateThreshold();
      this.setState({
        data: this.props.data,
        matches: this.props.matches,
        difficulty: this.props.difficulty,
        attempts: this.props.attempts,
        region: this.props.region,
      });
    };

    if (this.props.newGame !== prevProps.newGame) {
      this.setState({
        victory: false
      })
    }
  }

  // hideSubmissionForm = () => {
  //   const dbRef = firebase.database().ref(`${this.props.region}/${this.props.difficulty == 6 && 'easy' || this.props.difficulty == 8 && 'medium' || this.props.difficulty == 10 && 'hard'}`);
  //   dbRef.on('value', (response) => {
  //     this.setState({
  //       showSubmissionForm: false
  //     })
  //   })
  // }

  calculateThreshold = () => {
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
      region: this.props.region,
    });
  }

  victorySwal = () => {
    if (this.state.victory === true) {
      this.setState({
        victory: false,
        // showSubmissionForm: true
      });
      Swal.fire({
        title: "Congratulations!",
        text: `You did it in ${this.state.attempts} attempts.`,
        confirmButtonColor: '#ee1515',
        allowOutsideClick: false,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.threshold === null || this.props.attempts <= this.state.threshold ? 
            <SubmitForm
              matches={this.state.matches}
              newGame={this.props.newGame}
              attempts={this.state.attempts}
              region={this.state.region}
              difficulty={this.state.difficulty}
              showSubmissionForm={this.state.showSubmissionForm}
               />
           : null
        }
        {/* {this.hideSubmissionForm} */}
      </React.Fragment>
    )
  }
}

export default WinLogic;