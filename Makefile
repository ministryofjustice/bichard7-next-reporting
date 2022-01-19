SHELL := /bin/bash

########################################
# Install, Build
########################################

.PHONY: clean
clean:
	rm -rf src/@bichard/*/dist src/lambdas/*/build

.PHONY: install
install:
	scripts/install-all.sh

.PHONY: build
build:
	scripts/build-all.sh

.PHONY: test
test:
	scripts/test-all.sh
