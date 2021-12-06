#!/bin/bash

set -e

function upload_to_s3 {
  local sourceFilename=$1
  local destinationFilename=$2
  local contentType=$3

  if [[ -z "$contentType" ]]; then
    contentType="application/octet-stream"
  fi

  sourceHash=$(openssl dgst -binary -sha256 "$sourceFilename" | openssl base64)
  aws s3 cp "$sourceFilename" \
    "s3://$ARTIFACT_BUCKET/reporting/$destinationFilename" \
    --content-type "$contentType" \
    --acl bucket-owner-full-control \
    --metadata hash="$sourceHash"
}

############################################
# Lambdas
############################################

LAMBDAS=$(ls src/lambdas)

echo "Packaging each lambda..."
for lambda in ${LAMBDAS}; do
  NAME=$(echo "$lambda")

  echo "Packaging $lambda as $NAME..."
  cd "src/lambdas/$lambda/build"

  zip "$NAME.zip" "$NAME.js"

  # Upload to S3
  upload_to_s3 "$NAME.zip" "$NAME.zip"

  cd -
done
