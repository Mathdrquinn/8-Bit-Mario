'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Mario = require('./scss/Mario.scss');

var _Mario2 = _interopRequireDefault(_Mario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var startingLeftPt = -200;
var startingUpPt = 0;
var endingUpPt = 200;
var width = window.innerWidth;

var Mario = function (_Component) {
    _inherits(Mario, _Component);

    function Mario() {
        _classCallCheck(this, Mario);

        var _this = _possibleConstructorReturn(this, (Mario.__proto__ || Object.getPrototypeOf(Mario)).call(this));

        _this.state = {
            class: "stand",
            left: startingLeftPt,
            up: startingUpPt
        };
        return _this;
    }

    _createClass(Mario, [{
        key: 'run',
        value: function run(currentStance, vertical) {
            if (vertical > startingUpPt) return 'jump';
            switch (currentStance) {
                case 'stand':
                    {
                        return 'step-0';
                    }
                case 'step-0':
                    {
                        return 'step-1';
                    }
                case 'step-1':
                    {
                        return 'step-2';
                    }
                case 'step-2':
                    {
                        return 'step-3';
                    }
                case 'step-3':
                case 'jump':
                    {
                        return 'step-0';
                    }
            }
            return 'stand';
        }
    }, {
        key: 'calculateUp',
        value: function calculateUp(up, left) {
            var half = width / 2;
            var climax = 0.70 * width;
            if (left < half) {
                return startingUpPt;
            } else if (left < climax) {
                return up + 35;
            } else if (left > climax) {
                return up >= 25 ? up - 45 : startingUpPt;
            }
        }
    }, {
        key: 'move',
        value: function move(state) {
            var newState = _extends({}, state);
            newState.class = this.run(state.class, state.up);

            newState.left = state.left > width ? startingLeftPt : state.left + 30;
            newState.up = this.calculateUp(state.up, state.left);

            return newState;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setInterval(function () {
                _this2.setState(_this2.move(_this2.state));
            }, 100);
        }
    }, {
        key: 'render',
        value: function render() {
            var style = {
                position: 'relative',
                transform: 'translate(' + this.state.left + 'px, -' + this.state.up + 'px)'
            };

            return _react2.default.createElement('div', { id: 'Mario', className: this.state.class, style: style });
        }
    }]);

    return Mario;
}(_react.Component);

exports.default = Mario;
