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
## Usage

### File path
```js
        const parser = require('shopback-seo-parser');
		parser('./template.html')
		.then((result)=>{
			//Get result.
		});
```

### Stream
```js
        const fs = require('fs');
        const parser = require('shopback-seo-parser');
		fs.createReadStream('./template.html')
        .pipe(parser)
        .pipe(process.stdout);
```

### Defaults rules
./rules/pre-defined-rules.js
```js
	const rules = [
    /**
     * 1. Detect if any <img /> tag without alt attribute
    */

    {
        tag: {
            include: 'img',
        },
        attrs: {
            exclude: {
                alt: undefined
            }
        }
    },

    /**
     * 2. Detect if any <a /> tag without rel attribute
    */

    {
        tag: {
            include: 'a',
        },
        attrs: {
            exclude: {
                rel: undefined
            }
        }
    }, 
    
    /**
     * 3. In <head> tag
     *    i. Detect if header doesn’t have <title> tag
     *    ii. Detect if header doesn’t have <meta name=“descriptions” ... /> tag
     *    iii. Detect if header doesn’t have <meta name=“keywords” ... /> tag
    */

    {
        scope: 'head',
        tag: {
            include: 'title',
        }
    }, 
    {
        scope: 'head',
        tag: {
            exclude: 'img',
        },
        attrs: {
            include: {
                name: 'description'
            }
        }
    }, {
        scope: 'head',
        tag: {
            exclude: 'img',
        },
        attrs: {
            include: {
                name: 'keywords'
            }
        }
    }, 
    
    /**
     * 4. Detect if there’re more than 15 <strong> tag in HTML (15 is a value should be
configurable by user)
    */
    
    {
        tag: {
            include: 'strong',
        },
        condition: {
            '>': 15
        }
    }, 
    
    /**
     * 5. Detect if a HTML have more than one <H1> tag.
    */
    
    {
        tag: {
            include: 'H1',
        },
        condition: {
            '>': 1
        }
    }
];

```

### Customize rules
- Rule format : This mean find the tag img without alt attribute more than 10 tags.
```json
    {
        "tag": {
            "include": "img"
        },
        "attrs": {
            "exclude": {
                "alt": "undefined"
            }
        },
        "condition": {
            ">": 10        
        }
    }
```

- Set customize rules.
```js
	const parser = require('shopback-seo-parser');
	const customizeRule = [{
        "tag": {
            include: "img"
        },
        attrs: {
            exclude: {
                "alt": undefined
            }
        },
        condition: {
            ">": 10        
        }
    }];
	parser.setup({
		rules: customizeRules
	})
	.parser('./template.html')
	.then((result)=>{
		//Get result.
	});
```

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
  
	mocha <filepath>.mocha.js

## Run all test suite ##
  
	mocha ./test/**/*.mocha.js

----------
*Author: Noah*

*LastUpdated: 8/31/2018 04:56:12 PM*