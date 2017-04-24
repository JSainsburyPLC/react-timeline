'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Toggle = require('./Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controls = function Controls(_ref) {
  var isOpen = _ref.isOpen,
      toggleOpen = _ref.toggleOpen,
      zoomIn = _ref.zoomIn,
      zoomOut = _ref.zoomOut,
      zoom = _ref.zoom,
      zoomMin = _ref.zoomMin,
      zoomMax = _ref.zoomMax;
  return _react2.default.createElement(
    'div',
    { className: 'controls' },
    _react2.default.createElement(
      'div',
      { className: 'controls__content' },
      _react2.default.createElement(_Toggle2.default, { isOpen: isOpen, toggleOpen: toggleOpen }),
      _react2.default.createElement(
        'button',
        { className: 'controls__button controls__button--zoom-in', disabled: zoomMax && zoom >= zoomMax, onClick: zoomIn },
        'Zoom in'
      ),
      _react2.default.createElement(
        'button',
        { className: 'controls__button controls__button--zoom-out', disabled: zoomMin && zoom <= zoomMin, onClick: zoomOut },
        'Zoom out'
      )
    )
  );
};

Controls.propTypes = {
  isOpen: _react.PropTypes.bool.isRequired,
  toggleOpen: _react.PropTypes.func.isRequired,
  zoomIn: _react.PropTypes.func.isRequired,
  zoomOut: _react.PropTypes.func.isRequired,
  zoom: _react.PropTypes.number.isRequired,
  zoomMin: _react.PropTypes.number,
  zoomMax: _react.PropTypes.number
};

exports.default = Controls;
module.exports = exports['default'];