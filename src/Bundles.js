const UNIT = 1;

const EQUILATERAL_HEIGHT = Math.sqrt(UNIT - Math.pow(UNIT/2, 2));

const bundles = {
  hexagonal: {
    right: [[-UNIT/3, -UNIT/3], [-UNIT/3, 2 * UNIT/3], [2 * UNIT/3, -UNIT/3]],
    equilateral: (() => {
      const offsetY = -1/Math.tan(2*Math.PI/3) * -UNIT/2;
      return [[-UNIT/2, offsetY], [0,EQUILATERAL_HEIGHT + offsetY], [UNIT/2, offsetY]];
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
      const offsetY = -1/Math.tan(2*Math.PI/3) * -UNIT/2;
      const points = [];
      const first = [UNIT,0];
      let angle = 0;
      for (var i = 0; i < 4; i++) {
        const point = [
          (first[0] * Math.cos(angle)) - (first[1] * Math.sin(angle)),
          (first[0] * Math.sin(angle)) + (first[1] * Math.cos(angle)) + offsetY,
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
  },
  tangram: {
    rightSm: (() => {
      const points = [[0,0], [0,UNIT], [UNIT,0]];
      const c = centroid(...points);
      return points.map(point => {
        return [point[0] - c[0], point[1] - c[1]];
      });
    })(),
    rightMd: (() => {
      const side = Math.sqrt(Math.pow(UNIT, 2) * 2);
      const points = [[0,0], [0,side], [side,0]];
      const c = centroid(...points);
      return points.map(point => {
        return [point[0] - c[0], point[1] - c[1]];
      });
    })(),
    rightLg: (() => {
      const points = [[0,0], [0,2 * UNIT], [2 * UNIT,0]];
      const c = centroid(...points);
      return points.map(point => {
        return [point[0] - c[0], point[1] - c[1]];
      });
    })(),
    square: (() => {
      return [[0,0], [0,UNIT], [UNIT,UNIT], [UNIT,0]];
    })(),
    quadrilateral: (() => {
      return [[-UNIT/2,0], [-UNIT/2,UNIT], [UNIT/2,0], [UNIT/2,-UNIT]];
    })(),
  },
}

function centroid(a, b, c) {
  const cx = (a[0] + b[0] + c[0])/3;
  const cy = (a[1] + b[1] + c[1])/3;
  return [cx, cy];
}

export default bundles;
