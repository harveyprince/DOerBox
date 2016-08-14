/**
 * Created by harveyprince on 16/8/14.
 */
'use strict';
import { createStore } from 'redux';
import React,{ Component } from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';

import {Motion, spring} from 'react-motion';

const Demo = React.createClass({
    getInitialState() {
        return {open: false};
    },

    handleMouseDown() {
        this.setState({open: !this.state.open});
    },

    handleTouchStart(e) {
        e.preventDefault();
        this.handleMouseDown();
    },

    render() {
        return (
            <div>
                <button
                    onMouseDown={this.handleMouseDown}
                    onTouchStart={this.handleTouchStart}>
                    Toggle
                </button>

                <Motion style={{x: spring(this.state.open ? 400 : 0)}}>
                    {({x}) =>
                        // children is a callback which should accept the current value of
                        // `style`
                        <div className="demo0">
                            <div className="demo0-block" style={{
                                transform: `translate3d(${x}px, 0, 0)`,
                              }} />
                        </div>
                    }
                </Motion>
            </div>
        );
    },
});

ReactDOM.render(
    <Demo />,
    document.getElementById('test')
);