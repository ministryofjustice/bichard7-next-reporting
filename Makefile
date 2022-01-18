SHELL := /bin/bash

########################################
# Install, Build
########################################

.PHONY: install
install:
	scripts/install-all.sh

.PHONY: build
build:
	scripts/build-all.sh

.PHONY: test
test:
	scripts/test-all.sh
