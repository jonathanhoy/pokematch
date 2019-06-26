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
      <div>
        <p>Leaderboard</p>
        <ol>
          {
            Object.values(this.state.leaderboard)
              .sort((a, b) => (a.score > b.score) ? 1 : -1)
              .map((entry, index) => {
                if (entry.score !== 0) {
                  return (
                    <li index={index}>
                      <p>Name: {`${entry.name}`}</p>
                      <p>Score: {`${entry.score}`}</p>
                    </li>
                  )
                }
              })
          }
        </ol>
      </div>
    )
  }
}

export default Leaderboard;