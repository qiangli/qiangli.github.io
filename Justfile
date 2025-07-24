#!/usr/bin/env -S just --justfile

default:
  @just --list

install:
    pnpm install

build:
    pnpm build

start:
    go run server/main.go

tidy:
    pnpm format
    pnpm lint

run:
    go run server/main.go

