lib/ShapeFactory.js: src/ShapeFactory.js
	npm run babel $< -- -o $@

build: lib/ShapeFactory.js

.PHONY: build
