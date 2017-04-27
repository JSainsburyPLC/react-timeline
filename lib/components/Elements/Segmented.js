'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formatDate = require('../../utils/formatDate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars
var Segmented = function Segmented(_ref) {
  var title = _ref.title,
      start = _ref.start,
      end = _ref.end,
      style = _ref.style,
      tooltip = _ref.tooltip;
  return _react2.default.createElement(
    'div',
    { className: 'element', style: style },
    _react2.default.createElement(
      'div',
      { className: 'element__content', 'aria-hidden': 'true' },
      'Segmented'
    ),
    _react2.default.createElement(
      'div',
      { className: 'element__tooltip' },
      tooltip ? _react2.default.createElement(
        'div',
        null,
        tooltip
      ) : _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          'Segmented'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'strong',
            null,
            'Start'
          ),
          ' ',
          (0, _formatDate.getDayMonth)(start)
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'strong',
            null,
            'End'
          ),
          ' ',
          (0, _formatDate.getDayMonth)(end)
        )
      )
    )
  );
};

Segmented.propTypes = {
  title: _react.PropTypes.string,
  start: _react.PropTypes.instanceOf(Date),
  end: _react.PropTypes.instanceOf(Date),
  style: _react.PropTypes.shape({}),
  tooltip: _react.PropTypes.string
};

exports.default = Segmented;
module.exports = exports['default'];