lib/Bundles.js: src/Bundles.js
	npm run babel $< -- -o $@

lib/ShapeFactory.js: src/ShapeFactory.js
	npm run babel $< -- -o $@

build: lib/ShapeFactory.js lib/Bundles.js

.PHONY: build
