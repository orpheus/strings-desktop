.PHONY: help

help: ## : Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_%-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' ${MAKEFILE_LIST}

build: ## : Build dependencies
	yarn install

start: ## : Start the client
	yarn start
