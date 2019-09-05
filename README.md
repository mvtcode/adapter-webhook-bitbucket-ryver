# adapter-webhook-bitbucket-ryver

## Create AWS Lambda function

source nodejs 10

Create API Gateway, you have a public address API endpoint

## Config

In bitbucket: in your repository (permission admin) click setting in left slide, then click webhook.

Click button "Add webhook" and input

Title: etc

URL: API endpoint in aws

Status: check Active

Triggers: Repository push

IN AWS Lambda function create env your endpoint Ryver: ENV name **endpoint**

## Clone project

`git clone https://github.com/mvtcode/adapter-webhook-bitbucket-ryver.git`

`cd adapter-webhook-bitbucket-ryver`

## install package dependency

`npm i`

## Use

`./zip.sh`

Then deploy file app.zip for your function

