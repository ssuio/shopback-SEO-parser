# General

## Environment

**Windows**
> [NodeJS 10.9.0](https://nodejs.org/dist/v10.9.0/node-v10.9.0-x64.msi)

**Linux Based OS** Ubuntu/Debian
> curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -  
> sudo apt-get install -y nodejs  

**Linux Based OS** CentOS/Redhat
> curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -  
> sudo apt-get install -y nodejs  

----------
## Development

	git clone https://github.com/ssuio/shopback-SEO-parser
	npm install
	npm test

current active branch: **development**

----------
## Project Structure

&nbsp;&nbsp;├**models**

&nbsp;&nbsp;├**rules**

&nbsp;&nbsp;├**demo**

&nbsp;&nbsp;├**test**

----------
# UnitTest

## Run specified test ##

**step1 install mocha globally**

	npm install mocha -g

**step2 run specified test**
  
	mocha <filepath>.js

## Run all test suite ##
  
	cd app
	mocha ./test/**/*.mocha.js

----------
*Author: Noah*

*LastUpdated: 8/31/2018 04:56:12 PM*