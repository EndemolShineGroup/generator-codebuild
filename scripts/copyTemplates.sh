#!/usr/bin/env bash

for file in build; do
  cp -R "src/${file}/templates" "generators/${file}";
done;
unset file;
