import React, { Component } from 'react';

export default (WrappedComponent) => {
  class withHighScore extends Component {
    constructor(props) {
      super(props);
      this.state = {
        highScores: [],
      };
    }
    componentDidMount() {
      this.fetchScores();
    }

    fetchScores() {
      fetch('/scores?quantity=12')
        .then(res => res.json())
        .then(highScores => this.setState({ highScores }))
        .catch(err => console.error(err));
    }

    saveScore({ score, name }) {
      fetch('/scores', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        referrer: 'no-referrer',
        body: JSON.stringify({ score, name }),
      })
        .then((response) => {
          if (response.OK) {
            this.fetchScores();
          }
        });
    }

    render() {
      return (
        <div>
          <WrappedComponent
            {...this.props}
            {...this.state}
            refetchScore={this.fetchScores}
            saveScore={this.saveScore}
          />
        </div>
      );
    }
  }

  return withHighScore;
};
