import '!style!css!less!./resources/styles/app.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gc from './GameConstants';
import { flap, startGame, nameUpdate } from './ActionCreators';
import Flappy from './Flappy';

@connect((state) => state)
export default class JumpyBird extends Component {
  constructor(props) {
    super(props);

    this.handleClick = (event) => {
      event.preventDefault();
      this.props.dispatch(flap(this.props.timerRunning));
    };

    this.startGame = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.props.dispatch(startGame());
    };

    this.onNameChange = (event) => {
      this.props.dispatch(nameUpdate(event.target.value));
    }
  }

  getPillar ({ currentX, posX, gapTop }) {
    let upperHeight = gapTop;
    let lowerHeight = gc.bottomY - gapTop - gc.pillarGap;
    return (
      <div key={posX} className="pillars">
        <div className="pillar pillar-upper" style={{ left: currentX, height: upperHeight }}/>
        <div className="pillar pillar-lower" style={{ left: currentX, height: lowerHeight }}/>
      </div>
    );
  }

  render() {
    const {
      flappyY,
      pillarList,
      timerRunning,
      jumpCount,
      borderPosition,
      velocity,
      score,
      name,
      highScore,
      highScores,
    } = this.props;

    const pillars = pillarList.map(this.getPillar);
    const buttonText = (jumpCount >= 1) ? "RESTART" : "START";
    const scores = highScores.map(({ uuid, name, score }) => { return <li key={uuid}>{`${name}: ${score}`}</li>; });

    return (
      <div className="game">
        <div className="board" onClick={this.handleClick}>
          <h1 className="score">{score}</h1>
          { ( ! timerRunning) ? <a className="start-button" onClick={this.startGame}>{buttonText}</a> : <span /> }
          <div>
            {pillars}
          </div>
          <Flappy y={flappyY} velocity={velocity} />
          <div className="scrolling-border" style={{ backgroundPosition: borderPosition }}/>
          <h3 className="jump-count">Flaps: {jumpCount}</h3>
          <h3 className="high-score">High Score: {highScore}</h3>
        </div>
        <div className="side-panel">
          <div className="name-entry">
            <label>Enter Name:</label>
            <input onChange={this.onNameChange} value={name}/>
          </div>
          <div className="high-scores">
            <h1>High Scores</h1>
            <ul className="scores">
              {scores}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
