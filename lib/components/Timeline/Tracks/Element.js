'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Basic = require('../../Elements/Basic');

var _Basic2 = _interopRequireDefault(_Basic);

var _datePropType = require('../../../utils/datePropType');

var _datePropType2 = _interopRequireDefault(_datePropType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Element = function Element(_ref) {
  var time = _ref.time,
      trackStyle = _ref.trackStyle,
      style = _ref.style,
      id = _ref.id,
      title = _ref.title,
      start = _ref.start,
      end = _ref.end;
  return _react2.default.createElement(
    'div',
    {
      key: id,
      className: 'track__element',
      style: time.toStyleLeftAndWidth(start, end)
    },
    _react2.default.createElement(_Basic2.default, {
      title: title,
      style: (0, _extends3.default)({}, trackStyle, style)
    })
  );
};

Element.propTypes = {
  time: _react.PropTypes.shape({}).isRequired,
  trackStyle: _react.PropTypes.shape({}),
  style: _react.PropTypes.shape({}),
  id: _react.PropTypes.string.isRequired,
  title: _react.PropTypes.string,
  start: _datePropType2.default,
  end: _datePropType2.default
};

exports.default = Element;
module.exports = exports['default'];