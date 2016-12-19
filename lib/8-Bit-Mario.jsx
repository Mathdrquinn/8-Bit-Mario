import React, { Component } from 'react';
import styles from './scss/Mario.scss';

const startingLeftPt = -200;
const startingUpPt = 0;
const endingUpPt = 200;
const width = window.innerWidth;

export default class Mario extends Component {
    constructor() {
        super()
        this.state = {
            class: "stand",
            left: startingLeftPt,
            up: startingUpPt,
        };
    }

    run(currentStance, vertical) {
        if (vertical > startingUpPt) return 'jump';
        switch (currentStance) {
            case 'stand': {
                return 'step-0';
            }
            case 'step-0': {
                return 'step-1';
            }
            case 'step-1': {
                return 'step-2';
            }
            case 'step-2': {
                return 'step-3';
            }
            case 'step-3':
            case 'jump': {
                return 'step-0';
            }
        }
        return 'stand';
    }

    calculateUp(up, left) {
        const half = width / 2;
        const climax = 0.70 * width;
        if (left < half) {
            return startingUpPt;
        } else if (left < climax) {
            return up + 35;
        }else if (left > climax) {
            return (up >= 25) ? up - 45 : startingUpPt;
        }
    }

    move(state) {
        const newState = {...state};
        newState.class = this.run(state.class, state.up);

        newState.left = (state.left > width) ? startingLeftPt : state.left + 30;
        newState.up = this.calculateUp(state.up, state.left);

        return newState;
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(this.move(this.state))
        }, 100)
    }

    render() {
        const style = {
            position: 'relative',
            transform: `translate(${this.state.left}px, -${this.state.up}px)`,
        };

        return (
            <div id="Mario" className={this.state.class} style={style}></div>
        );
    }
}