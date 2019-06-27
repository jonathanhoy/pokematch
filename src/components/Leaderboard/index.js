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
    const dbRef = firebase.database().ref();
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
  render() {
    return (
      <section className="leaderboard">
        <h3 className="leaderboard__heading">Leaderboard</h3>
        <ol className="leaderboard__list">
          {
            Object.values(this.state.leaderboard)
              .sort((a, b) => (a.score > b.score) ? 1 : -1)
              .map((entry, index) => {
                if (entry.score !== 0 && index <= 6) {
                  return (
                    <li index={index - 1} className="leaderboard__item">
                      <p>{`${index - 1}. ${entry.name}`}</p>
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