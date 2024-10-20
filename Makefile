SHELL := /bin/sh
.ONESHELL:
.SHELLFLAGS := -eu -c
MAKEFLAGS += --warn-undefined-variables

.PHONY: submodules

submodules: part3/backend/package.json

part3/backend/package.json:
	@git config submodule.recurse true
	@git submodule update --init
	@git submodule foreach \
        'git switch "$$(git config -f $${toplevel}/.gitmodules submodule.$${name}.branch)"'
