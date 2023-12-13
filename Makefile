#install:
#	pip install --upgrade pip &&\
#		pip install -r requirements.txt
#
name: Python CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Install build dependencies
      run: sudo apt-get install -y build-essential gcc
    - name: Install packages
      run: make install
    - name: Format
      run: make format
    - name: Lint
      run: make lint
    - name: Test
      run: make test
	
