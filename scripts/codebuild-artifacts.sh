#!/bin/bash

set -e

function upload_to_s3 {
  local sourceFilename=$1
  local destinationFilename=$2
  local contentType=$3

  if [[ -z "$contentType" ]]; then
    contentType="application/octet-stream"
  fi

  aws s3 cp "$sourceFilename" \
    "s3://$S3_BUCKET/reporting/$destinationFilename" \
    --content-type "$contentType" \
    --acl bucket-owner-full-control
}

############################################
# Lambdas
############################################

LAMBDAS=$(ls src/lambdas)

echo "Packaging each lambda..."
for lambda in ${LAMBDAS}; do
  NAME=$(echo "$lambda" | sed -r "s/(-)([a-z])/\U\2/g")

  if [ "$lambda" == "mps-report"]; then
    echo "Packaging $lambda as $NAME..."
    cd "src/lambdas/$lambda/build"

    zip "$NAME.zip" "$NAME.js"

    # Upload to S3
    upload_to_s3 "$NAME.zip" "$NAME.zip"
  fi

  cd -
done
