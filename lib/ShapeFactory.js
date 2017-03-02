"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Shape = require("libshapes/lib/Shape");

var _Shape2 = _interopRequireDefault(_Shape);

var _Bundles = require("./Bundles.js");

var _Bundles2 = _interopRequireDefault(_Bundles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShapeFactory = function () {
  function ShapeFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$unit = _ref.unit,
        unit = _ref$unit === undefined ? 1 : _ref$unit,
        _ref$definitions = _ref.definitions,
        definitions = _ref$definitions === undefined ? _Bundles2.default.hexagonal : _ref$definitions;

    _classCallCheck(this, ShapeFactory);

    this._definitions = {};
    this._unit = unit;

    this._setDefinitions(definitions);
  }

  _createClass(ShapeFactory, [{
    key: "make",
    value: function make(type, unit) {
      var scale = unit || this._unit;
      if (!this._definitions[type]) {
        throw new Error("'" + type + "' is not a defined shape");
      }
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