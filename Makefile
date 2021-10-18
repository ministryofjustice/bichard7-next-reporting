SHELL := /bin/bash

########################################
# Install, Build
########################################

.PHONY: build
build:
	scripts/install-all.sh && scripts/build-all.sh
