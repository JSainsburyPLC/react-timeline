'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _Now = require('./Marker/Now');

var _Now2 = _interopRequireDefault(_Now);

var _Pointer = require('./Marker/Pointer');

var _Pointer2 = _interopRequireDefault(_Pointer);

var _datePropType = require('../../utils/datePropType');

var _datePropType2 = _interopRequireDefault(_datePropType);

var _getMouseX = require('../../utils/getMouseX');

var _getMouseX2 = _interopRequireDefault(_getMouseX);

var _formatDate = require('../../utils/formatDate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timeline = function (_Component) {
  (0, _inherits3.default)(Timeline, _Component);

  function Timeline(props) {
    (0, _classCallCheck3.default)(this, Timeline);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Timeline.__proto__ || (0, _getPrototypeOf2.default)(Timeline)).call(this, props));

    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);

    _this.state = { pointerX: 0, pointerVisible: false, pointerHighlighted: false };
    return _this;
  }

  (0, _createClass3.default)(Timeline, [{
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      this.setState({ pointerX: (0, _getMouseX2.default)(e) });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ pointerHighlighted: false });
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({ pointerVisible: true, pointerHighlighted: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          now = _props.now,
          time = _props.time,
          timebar = _props.timebar,
          tracks = _props.tracks;
      var _state = this.state,
          pointerX = _state.pointerX,
          pointerVisible = _state.pointerVisible,
          pointerHighlighted = _state.pointerHighlighted;

      return _react2.default.createElement(
        'div',
        { className: 'timeline' },
        _react2.default.createElement(
          'div',
          { className: 'timeline__content', style: { width: time.timelineWidth + 'px' } },
          now && _react2.default.createElement(_Now2.default, { now: now, visible: true, time: time }),
          _react2.default.createElement(_Pointer2.default, {
            x: pointerX,
            visible: pointerVisible,
            highlighted: pointerHighlighted,
            text: (0, _formatDate.getDayMonth)(time.fromX(pointerX))
          }),
          _react2.default.createElement(
            'div',
            {
              onMouseMove: this.handleMouseMove,
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave
            },
            _react2.default.createElement(_Header2.default, { time: time, timebar: timebar })
          ),
          _react2.default.createElement(_Body2.default, { time: time, tracks: tracks })
        )
      );
    }
  }]);
  return Timeline;
}(_react.Component);

Timeline.propTypes = {
  now: _datePropType2.default,
  time: _react.PropTypes.shape({}).isRequired,
  timebar: _react.PropTypes.shape({}).isRequired,
  tracks: _react.PropTypes.arrayOf(_react.PropTypes.shape({}))
};

exports.default = Timeline;
module.exports = exports['default'];