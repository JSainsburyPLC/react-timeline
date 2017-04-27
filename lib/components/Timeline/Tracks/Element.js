'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Elements = require('../../Elements');

var _Elements2 = _interopRequireDefault(_Elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrackElement = function TrackElement(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === undefined ? 'Basic' : _ref$type,
      time = _ref.time,
      style = _ref.style,
      id = _ref.id,
      title = _ref.title,
      start = _ref.start,
      end = _ref.end,
      tooltip = _ref.tooltip;

  var Element = _Elements2.default[type];
  return _react2.default.createElement(
    'div',
    {
      key: id,
      className: 'track__element',
      style: time.toStyleLeftAndWidth(start, end)
    },
    _react2.default.createElement(Element, {
      tooltip: tooltip,
      title: title,
      start: start,
      end: end,
      style: (0, _extends3.default)({}, style)
    })
  );
};

TrackElement.propTypes = {
  type: _react.PropTypes.string,
  time: _react.PropTypes.shape({}).isRequired,
  style: _react.PropTypes.shape({}),
  id: _react.PropTypes.string.isRequired,
  title: _react.PropTypes.string,
  start: _react.PropTypes.instanceOf(Date).isRequired,
  end: _react.PropTypes.instanceOf(Date).isRequired,
  tooltip: _react.PropTypes.string
};

exports.default = TrackElement;
module.exports = exports['default'];