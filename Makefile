SHELL := /bin/bash

########################################
# Install, Build, Test Commands
########################################

.PHONY: clean
clean:
	rm -rf src/@bichard/*/build src/lambdas/*/build

.PHONY: install
install:
	scripts/install-all.sh

.PHONY: build
build: types forces postgres-gateway dynamo-gateway \
	automation-report common-platform-report mps-report top-exceptions-report

.PHONY: test
test:
	scripts/test-all.sh

########################################
# Build Commands
########################################

# Package => build output aliases
automation-report: src/lambdas/automation-report/build
common-platform-report: src/lambdas/common-platform-report/build
mps-report: src/lambdas/mps-report/build
top-exceptions-report: src/lambdas/top-exceptions-report/build
dynamo-gateway: src/@bichard/dynamo-gateway/build
forces: src/@bichard/forces/build
postgres-gateway: src/@bichard/postgres-gateway/build
types: src/@bichard/types/build

define get_source_files
	$(shell find $(1) \
		\( \
			-name build -o \
			-name documentation -o \
			-name node_modules \
		\) -prune -o \
		-type f \( \
			-iname '*.js' -o \
			-iname '*.json' -o \
			-iname '*.jsx' -o \
			-iname '*.sh' -o \
			-iname '*.snap' -o \
			-iname '*.ts' -o \
			-iname '*.tsx'
		\) -print \
	)
endef

# Source files for each package
AUTOMATION_REPORT_SOURCE := $(call get_source_files,src/lambdas/automation-report)
COMMON_PLATFORM_REPORT_SOURCE := $(call get_source_files,src/lambdas/common-platform-report)
MPS_REPORT_SOURCE := $(call get_source_files,src/lambdas/mps-report)
TOP_EXCEPTIONS_REPORT_SOURCE := $(call get_source_files,src/lambdas/top-exceptions-report)
DYNAMO_GATEWAY_SOURCE := $(call get_source_files,src/@bichard/dynamo-gateway)
FORCES_SOURCE := $(call get_source_files,src/@bichard/forces)
POSTGRES_GATEWAY_SOURCE := $(call get_source_files,src/@bichard/postgres-gateway)
TYPES_SOURCE := $(call get_source_files,src/@bichard/types)

# How to build each package
src/lambdas/automation-report/build: $(DYNAMO_GATEWAY_SOURCE) $(FORCES_SOURCE) $(TYPES_SOURCE) $(AUTOMATION_REPORT_SOURCE)
	cd src/lambdas/automation-report && npm run build

src/lambdas/common-platform-report/build: $(DYNAMO_GATEWAY_SOURCE) $(TYPES_SOURCE) $(COMMON_PLATFORM_REPORT_SOURCE)
	cd src/lambdas/common-platform-report && npm run build

src/lambdas/mps-report/build: $(POSTGRES_GATEWAY_SOURCE) $(TYPES_SOURCE) $(MPS_REPORT_SOURCE)
	cd src/lambdas/mps-report && npm run build

src/lambdas/top-exceptions-report/build: $(DYNAMO_GATEWAY_SOURCE) $(FORCES_SOURCE) $(TYPES_SOURCE) $(TOP_EXCEPTIONS_REPORT_SOURCE)
	cd src/lambdas/top-exceptions-report && npm run build

src/@bichard/dynamo-gateway/build: $(TYPES_SOURCE) $(DYNAMO_GATEWAY_SOURCE)
	cd src/@bichard/dynamo-gateway && npm run build

src/@bichard/forces/build: $(FORCES_SOURCE)
	cd src/@bichard/forces && npm run build

src/@bichard/postgres-gateway/build: $(TYPES_SOURCE) $(POSTGRES_GATEWAY_SOURCE)
	cd src/@bichard/postgres-gateway && npm run build

src/@bichard/types/build: $(TYPES_SOURCE)
	cd src/@bichard/types && npm run build
