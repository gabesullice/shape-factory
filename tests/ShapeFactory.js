import test from "ava";
import ShapeFactory from "../lib/ShapeFactory";
import bundles from "../lib/Bundles";

test("Can instantiate a new ShapeFactory", t => {
  const _ = new ShapeFactory();
});

test("Can create a shape", t => {
  const sf = new ShapeFactory();
  const triangle = sf.make('equilateral');
})

test("Can load an alternative shape definition bundle", t => {
  const sf = new ShapeFactory({definitions: bundles.tangram});
  const triangle = sf.make('rightMd');
});
