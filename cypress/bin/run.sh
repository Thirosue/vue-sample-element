#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
echo $SCRIPT_DIR 
cd $SCRIPT_DIR/../..

rm -rf mochawesome-report/ tests/e2e/videos/ tests/e2e/screenshots/ cypress/report/
mkdir -p cypress/report/

./node_modules/.bin/cypress run --browser chrome
yarn --silent mochawesome-merge > cypress/report/mochawesome.json
yarn marge cypress/report/mochawesome.json -o cypress/report