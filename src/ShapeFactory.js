import Shape from "libshapes/lib/Shape";

const UNIT = 1;

const EQUILATERAL_HEIGHT = Math.sqrt(UNIT - Math.pow(UNIT/2, 2));

const DEFINITIONS = {
  right: [[-UNIT/3, -UNIT/3], [-UNIT/3, 2 * UNIT/3], [2 * UNIT/3, -UNIT/3]],
  equilateral: (() => {
    const offsetY = -1/Math.tan(2*Math.PI/3) * -UNIT/2;
    return [[-UNIT/2,-offsetY], [0,EQUILATERAL_HEIGHT - offsetY], [UNIT/2,-offsetY]];
  })(),
  square: [[-UNIT/2,-UNIT/2], [-UNIT/2,UNIT/2], [UNIT/2,UNIT/2], [UNIT/2,-UNIT/2]],
  hexagon: (() => {
    const points = [];
    const first = [UNIT,0];
    let angle = 0;
    for (var i = 0; i < 6; i++) {
      const point = [
        (first[0] * Math.cos(angle)) - (first[1] * Math.sin(angle)),
        (first[0] * Math.sin(angle)) + (first[1] * Math.cos(angle)),
      ];
      points.push(point);
      angle = angle + Math.PI/3;
    }
    return points;
  })(),
  diamond: [[-UNIT/2,0], [0,EQUILATERAL_HEIGHT], [UNIT/2,0], [0,-EQUILATERAL_HEIGHT]],
  rhombus: [[-UNIT/2,0], [-UNIT/2, UNIT], [UNIT/2,0], [UNIT/2, -UNIT]],
  trapezoid: (() => {
    const points = [];
    const first = [UNIT,0];
    let angle = 0;
    for (var i = 0; i < 4; i++) {
      const point = [
        (first[0] * Math.cos(angle)) - (first[1] * Math.sin(angle)),
        (first[0] * Math.sin(angle)) + (first[1] * Math.cos(angle)),
      ];
      points.push(point);
      angle = angle + Math.PI/3;
    }
    return points;
  })(),
  parallelogram: (() => {
    const m1 = Math.tan((Math.PI/2 + Math.PI/3)/2);
    const m2 = -1/m1;
    return [
      [-UNIT/4, m2 * -UNIT/4],
      [UNIT/4, m1 * UNIT/4],
      [UNIT/4, m2 * UNIT/4],
      [-UNIT/4, m1 * -UNIT/4]
    ];
  })()
};

export default class ShapeFactory {

  constructor({unit = 1, definitions = DEFINITIONS} = {}) {
    this._definitions = {};
    this._unit = unit;

    this._setDefinitions(definitions);
  }

  make(type, unit) {
    const scale = unit || this._unit;
    const points = this._definitions[type].map(point => {
      return [point[0] * scale, point[1] * scale];
    });
    return this.arbitrary(points);
  }

  arbitrary(vertices) {
    return new Shape(vertices);
  }

  setDefinition(label, vertices) {
    this._definitions[label] = vertices;
  }

  unsetDefinition(label) {
    return delete this._definitions[label];
  }

  _setDefinitions(definitions) {
    for (let label in definitions) {
      this.setDefinition(label, definitions[label]);
    }
  }

}
