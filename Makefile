SHELL := /bin/bash

########################################
# Install, Build
########################################

.PHONY: install
install:
	scripts/install-all.sh

.PHONY:
build: install
	scripts/build-all.sh
