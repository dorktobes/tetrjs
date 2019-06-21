import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EnterYourName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initials: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange({ target: { value } }) {
    this.setState({ initials: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit({ score: this.props.score, name: this.state.initials });
  }
  render() {
    return (
      <div>
        <p>Your score was {this.props.score}</p>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor="initials">Enter your initials below to be added to the leaderboard
            <br />
            <input id="initials" maxLength="3" value={this.state.initials} onChange={this.handleChange} />
          </label>
          <br />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

EnterYourName.propTypes = {
  score: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EnterYourName;
