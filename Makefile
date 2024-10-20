SHELL := /bin/sh
.ONESHELL:
.SHELLFLAGS := -eu -c
MAKEFLAGS += --warn-undefined-variables

.PHONY: submodules

submodules:
	@git submodule update --init
	@git submodule foreach \
        'git switch "$$(git config -f $${toplevel}/.gitmodules submodule.$${name}.branch)"'
