'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Basic = require('./Basic');

var _Basic2 = _interopRequireDefault(_Basic);

var _Segmented = require('./Segmented');

var _Segmented2 = _interopRequireDefault(_Segmented);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Basic: _Basic2.default,
  Segmented: _Segmented2.default
};
module.exports = exports['default'];