import React, { Component } from 'react';
import firebase from '../../firebase';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      leaderboard: []
    }
  }

  componentDidMount() {
    this.setState({
      difficulty: this.props.difficulty
    });
    const dbRef = firebase.database().ref(`${this.props.region}/easy`)
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

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {

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

      // const thresholdRef = firebase.database().ref(`thresholds/${this.props.region}/${this.props.difficulty == 6 && 'easy' || this.props.difficulty == 8 && 'medium' || this.props.difficulty == 10 && 'hard'}`);
      // thresholdRef.on('value', (response) => {
      //   console.log('RESPONSE', response.val());
        
      // })
    }
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  difficulty = () => {
    switch(this.props.difficulty) {
      case 6:
      case "6":
        return 'easy';
      case 8:
      case "8":
        return 'medium';
      case 10:
      case "10":
        return 'hard';
    }
  }

  render() {
    return (
      <section className="leaderboard">
        <h3 className="leaderboard__heading">Leaderboard</h3>
        <p className="leaderboard__subheading">{this.capitalize(this.props.region)} - {this.capitalize(this.difficulty())}</p>
        <ol className="leaderboard__list">
          {
            Object.values(this.state.leaderboard)
              .sort((a, b) => (a.score > b.score || a.timestamp < b.timestamp) ? 1 : -1)
              .map((entry, index) => {
                if (entry.score !== 0 && index < 5) {
                  return (
                    <li index={index} className="leaderboard__item">
                      <p>{`${index + 1}. ${entry.name}`}</p>
                      <p>{`${entry.score}`}</p>
                    </li>
                  )
                }
              })
          }
        </ol>
      </section>
    )
  }
}

export default Leaderboard;