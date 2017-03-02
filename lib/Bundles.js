"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UNIT = 1;

var EQUILATERAL_HEIGHT = Math.sqrt(UNIT - Math.pow(UNIT / 2, 2));

var bundles = {
  hexagonal: {
    right: [[-UNIT / 3, -UNIT / 3], [-UNIT / 3, 2 * UNIT / 3], [2 * UNIT / 3, -UNIT / 3]],
    equilateral: function () {
      var offsetY = -1 / Math.tan(2 * Math.PI / 3) * -UNIT / 2;
      return [[-UNIT / 2, offsetY], [0, EQUILATERAL_HEIGHT + offsetY], [UNIT / 2, offsetY]];
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
      var offsetY = -1 / Math.tan(2 * Math.PI / 3) * -UNIT / 2;
      var points = [];
      var first = [UNIT, 0];
      var angle = 0;
      for (var i = 0; i < 4; i++) {
        var point = [first[0] * Math.cos(angle) - first[1] * Math.sin(angle), first[0] * Math.sin(angle) + first[1] * Math.cos(angle) + offsetY];
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
  },
  tangram: {
    rightSm: function () {
      var points = [[0, 0], [0, UNIT], [UNIT, 0]];
      var c = centroid.apply(undefined, points);
      return points.map(function (point) {
        return [point[0] - c[0], point[1] - c[1]];
      });
    }(),
    rightMd: function () {
      var side = Math.sqrt(Math.pow(UNIT, 2) * 2);
      var points = [[0, 0], [0, side], [side, 0]];
      var c = centroid.apply(undefined, points);
      return points.map(function (point) {
        return [point[0] - c[0], point[1] - c[1]];
      });
    }(),
    rightLg: function () {
      var points = [[0, 0], [0, 2 * UNIT], [2 * UNIT, 0]];
      var c = centroid.apply(undefined, points);
      return points.map(function (point) {
        return [point[0] - c[0], point[1] - c[1]];
      });
    }(),
    square: function () {
      return [[0, 0], [0, UNIT], [UNIT, UNIT], [UNIT, 0]];
    }(),
    quadrilateral: function () {
      return [[-UNIT / 2, 0], [-UNIT / 2, UNIT], [UNIT / 2, 0], [UNIT / 2, -UNIT]];
    }()
  }
};

function centroid(a, b, c) {
  var cx = (a[0] + b[0] + c[0]) / 3;
  var cy = (a[1] + b[1] + c[1]) / 3;
  return [cx, cy];
}

exports.default = bundles;