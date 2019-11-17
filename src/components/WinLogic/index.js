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
        victory: this.props.victory,
        region: this.props.region
      });
    };
    if (prevState !== this.state &&
        this.state.matches !== 0 &&
        this.state.matches === this.state.difficulty &&
        this.state.victory === false) {
          this.setState({
            victory: true,
            matches: 0
          });
        };
  }

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.id]: e.target.value
  //   })
  // }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const node = this.state.customGame === true ? this.state.customGameContext : this.state.region;
  //   const dbRef = firebase.database().ref(`${node}/`);
  //   const leaderboardEntry = {
  //     name: this.state.name,
  //     score: this.state.attempts
  //   };
  //   dbRef.push(leaderboardEntry);
  // }

  render() {
    return (
      <React.Fragment>
        {/* {this.state.victory === true && (
          <div>
            <h1>VICTORY!</h1>
            <form action="" onSubmit={this.handleSubmit}>
              <label htmlFor="">name</label>
              <input id="name" type="text" value={this.state.name} onChange={this.handleChange}/>
              <button>submit</button>
            </form>
          </div>
        )} */}
        {
          this.state.victory === true ? (
            <React.Fragment>
              <h1>Victory!</h1>
              <p>You did it in {this.props.attempts} attempts. Nice!</p>
            </React.Fragment>
          ) : null
        }
        <SubmitForm
          victory={this.state.victory}
          attempts={this.state.attempts}
          region={this.state.region}
          difficulty={this.state.difficulty} />
      </React.Fragment>
    )
  }
}

export default WinLogic;