#!/usr/bin/env bash

for file in project; do
  cp -R "src/${file}/templates" "generators/${file}";
done;
unset file;
