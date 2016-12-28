"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Shape = require("libshapes/lib/Shape");

var _Shape2 = _interopRequireDefault(_Shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UNIT = 1;

var EQUILATERAL_HEIGHT = Math.sqrt(UNIT - Math.pow(UNIT / 2, 2));

var DEFINITIONS = {
  right: [[-UNIT / 3, -UNIT / 3], [-UNIT / 3, 2 * UNIT / 3], [2 * UNIT / 3, -UNIT / 3]],
  equilateral: function () {
    var offsetY = -1 / Math.tan(2 * Math.PI / 3) * -UNIT / 2;
    return [[-UNIT / 2, -offsetY], [0, EQUILATERAL_HEIGHT - offsetY], [UNIT / 2, -offsetY]];
  }(),
  square: [[-UNIT / 2, -UNIT / 2], [-UNIT / 2, UNIT / 2], [UNIT / 2, UNIT / 2], [UNIT / 2, -UNIT / 2]],
  hexagon: function () {
    var points = [];
    var first = [UNIT, 0];
    var angle = 0;
    for (var i = 0; i < 6; i++) {
      var point = [first[0] * Math.cos(angle) - first[1] * Math.sin(angle), first[0] * Math.sin(angle) + first[1] * Math.cos(angle)];
      points.push(point);
      angle = angle + Math.PI / 3;
    }
    return points;
  }(),
  diamond: [[-UNIT / 2, 0], [0, EQUILATERAL_HEIGHT], [UNIT / 2, 0], [0, -EQUILATERAL_HEIGHT]],
  rhombus: [[-UNIT / 2, 0], [-UNIT / 2, UNIT], [UNIT / 2, 0], [UNIT / 2, -UNIT]],
  trapezoid: function () {
    var points = [];
    var first = [UNIT, 0];
    var angle = 0;
    for (var i = 0; i < 4; i++) {
      var point = [first[0] * Math.cos(angle) - first[1] * Math.sin(angle), first[0] * Math.sin(angle) + first[1] * Math.cos(angle)];
      points.push(point);
      angle = angle + Math.PI / 3;
    }
    return points;
  }(),
  parallelogram: function () {
    var m1 = Math.tan((Math.PI / 2 + Math.PI / 3) / 2);
    var m2 = -1 / m1;
    return [[-UNIT / 4, m2 * -UNIT / 4], [UNIT / 4, m1 * UNIT / 4], [UNIT / 4, m2 * UNIT / 4], [-UNIT / 4, m1 * -UNIT / 4]];
  }()
};

var ShapeFactory = function () {
  function ShapeFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$unit = _ref.unit,
        unit = _ref$unit === undefined ? 1 : _ref$unit,
        _ref$definitions = _ref.definitions,
        definitions = _ref$definitions === undefined ? DEFINITIONS : _ref$definitions;

    _classCallCheck(this, ShapeFactory);

    this._definitions = {};
    this._unit = unit;

    this._setDefinitions(definitions);
  }

  _createClass(ShapeFactory, [{
    key: "make",
    value: function make(type, unit) {
      var scale = unit || this._unit;
      var points = this._definitions[type].map(function (point) {
        return [point[0] * scale, point[1] * scale];
      });
      return this.arbitrary(points);
    }
  }, {
    key: "arbitrary",
    value: function arbitrary(vertices) {
      return new _Shape2.default(vertices);
    }
  }, {
    key: "setDefinition",
    value: function setDefinition(label, vertices) {
      this._definitions[label] = vertices;
    }
  }, {
    key: "unsetDefinition",
    value: function unsetDefinition(label) {
      return delete this._definitions[label];
    }
  }, {
    key: "_setDefinitions",
    value: function _setDefinitions(definitions) {
      for (var label in definitions) {
        this.setDefinition(label, definitions[label]);
      }
    }
  }]);

  return ShapeFactory;
}();

exports.default = ShapeFactory;