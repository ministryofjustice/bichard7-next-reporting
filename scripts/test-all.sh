#!/bin/bash

set -e

projects=$(cat scripts/projects)

for p in ${projects[@]}; do
  if [[ $p =~ src/lambdas/.* ]]
  then
    echo "Running tests for $p..."
    cd $p
    npm run test --if-present
    cd -
  fi
done
