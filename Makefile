SHELL := /usr/bin/env sh
.ONESHELL:
.SHELLFLAGS := -eu -c
MAKEFLAGS += --warn-undefined-variables

.PHONY: submodules

submodules: part3/backend/.git

part3/backend/.git:
	@git config submodule.recurse true
	@git submodule update --init
	@git submodule foreach \
        'git switch "$$(git config -f $${toplevel}/.gitmodules submodule.$${name}.branch)"'
