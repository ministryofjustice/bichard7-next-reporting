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

LAMBDAS=$(ls build)

echo "Packaging each lambda..."
for lambda in ${LAMBDAS}; do
  echo "Packaging $lambda as $lambda..."
  cd "build/$lambda"
  mv "index.js" "$lambda.js"

  zip "$lambda.zip" "$lambda.js"

  # Upload to S3
  upload_to_s3 "$lambda.zip" "$lambda.zip"

  cd -
done
