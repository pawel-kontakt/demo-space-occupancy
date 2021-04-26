#!/bin/sh

#
# Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
#

for index in $(find  /usr/share/nginx/html/ -name 'index.html'); do
  echo ${index}
  envsubst < ${index} > ${index}.processed
  mv ${index}.processed ${index}
done

nginx -g 'daemon off;'
