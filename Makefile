.PHONY: default help install build start tidy run

default: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-12s %s\n", $$1, $$2}'

install: ## Install pnpm dependencies
	pnpm install

build: ## Build the static site to out/
	pnpm build

start: ## Serve out/ via the Go file server
	go run server/main.go

tidy: ## Format and lint the codebase
	pnpm format
	pnpm lint

run: ## Alias for start
	go run server/main.go
