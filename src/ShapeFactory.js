import Shape from "libshapes/lib/Shape";
import bundles from "./Bundles.js";

export default class ShapeFactory {

  constructor({unit = 1, definitions = bundles.hexagonal} = {}) {
    this._definitions = {};
    this._unit = unit;

    this._setDefinitions(definitions);
  }

  make(type, unit) {
    const scale = unit || this._unit;
    if (!this._definitions[type]) {
      throw new Error(`'${type}' is not a defined shape`);
    }
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
