# Get Makefile directory name: http://stackoverflow.com/a/5982798/376773.
# This is a defensive programming approach to ensure that this Makefile
# works even when invoked with the `-C`/`--directory` option.
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# BIN directory
BIN := $(THIS_DIR)/node_modules/.bin
BABEL ?= $(NODE) $(BIN)/babel

ES6_FILES := $(wildcard *.es6)

COMPILED_FILES := $(ES6_FILES:.es6=.js)

build: $(COMPILED_FILES)

clean: $(COMPILED_FILES)
	rm $(COMPILED_FILES)

distclean:
	rm -r node_modules

%.js: %.es6
	@printf '\e[1;93m %-10s\e[m %s > %s\n' "babel" "$<" "$@"
	@$(BABEL) "$<" --optional runtime --experimental > "$@"
