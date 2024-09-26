import React, { Component } from 'react';
import firebase from '../../firebase';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      leaderboard: [],
      showMobileLeaderboard: false
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
      this.setState({
        showMobileLeaderboard: this.props.showMobileLeaderboard
      })
      const dbRef = firebase.database().ref(`${this.props.region}/${this.difficulty()}`);
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
      default:
        break;
    }
  }

  render() {
    return (
      <section className={`leaderboard ${this.state.showMobileLeaderboard ? 'opened' : ''}`}>
        <div className="leaderboard__heading-container">
          <h3 className="leaderboard__heading">Leaderboard</h3>
          <button
            className="leaderboard__exit mobile-button--exit"
            onClick={this.props.toggleLeaderboard}>
              Exit
          </button>
        </div>
        <p className="leaderboard__subheading"><span>{this.capitalize(this.props.region)}</span> <span>{this.capitalize(this.difficulty())}</span></p>
        <ol className="leaderboard__list">
          {
            Object.values(this.state.leaderboard)
              .sort((a, b) => (a.score > b.score || a.timestamp < b.timestamp) ? 1 : -1)
              .map((entry, index) => {
                if (entry.score !== 0 && index < 5) {
                  return (
                    <li key={index} className="leaderboard__item">
                      <p className="leaderboard__name">{`${index + 1}. ${entry.name}`}</p>
                      <p className="leaderboard__score">{`${entry.score}`}</p>
                    </li>
                  )
                } else {
                  return null
                }
              })
          }
        </ol>
      </section>
    )
  }
}

export default Leaderboard;
