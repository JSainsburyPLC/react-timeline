'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MouseMarker = function MouseMarker(_ref) {
  var x = _ref.x,
      text = _ref.text,
      visible = _ref.visible,
      highlighted = _ref.highlighted;
  return _react2.default.createElement(
    _2.default,
    { modifier: 'pointer', x: x, visible: visible, highlighted: highlighted },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'strong',
          null,
          text
        )
      )
    )
  );
};

MouseMarker.propTypes = {
  x: _react.PropTypes.number.isRequired,
  text: _react.PropTypes.string.isRequired,
  visible: _react.PropTypes.bool,
  highlighted: _react.PropTypes.bool
};

exports.default = MouseMarker;
module.exports = exports['default'];