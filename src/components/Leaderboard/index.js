import React, { Component } from 'react';
import firebase from '../../firebase';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      leaderboard: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const dbRef = firebase.database().ref(`${this.props.customGame === true ? this.props.customGameContext : this.props.region}`);
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
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  render() {
    return (
      <section className="leaderboard">
        <h3 className="leaderboard__heading">Leaderboard</h3>
        <p className="leaderboard__subheading">{this.capitalize(this.props.customGame === true ? this.props.customGameContext : this.props.region)}</p>
        <ol className="leaderboard__list">
          {
            Object.values(this.state.leaderboard)
              .sort((a, b) => (a.score > b.score) ? 1 : -1)
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