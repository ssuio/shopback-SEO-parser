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
## Demo
> npm install && npm start

----------

## Usage

```sh
npm install shopback-seo-parser --save
```

### File path
```js
        const ShopbackSEOParser = require('shopback-seo-parser');
        const parser = new ShopbackSEOParser();

        parser.parse('./template.html')
            .then((result)=>{
                //Get result.
            });
```

### Stream
```js
        const fs = require('fs');
        const ShopbackSEOParser = require('shopback-seo-parser');
        const parser = new ShopbackSEOParser();

        fs.createReadStream('./template.html')
            .pipe(parser)
            .pipe(process.stdout); 
            //result
```

### Async
```js
        const ShopbackSEOParser = require('shopback-seo-parser');
        const parser = new ShopbackSEOParser();
        let result = await parser.parse('./template.html');
        //result
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
            without: {
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
            without: {
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
            with: {
                name: 'description'
            }
        }
    }, {
        scope: 'head',
        tag: {
            exclude: 'img',
        },
        attrs: {
            with: {
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

### Speciffy default rules
- Specify default rules by number array.
```js
        const ShopbackSEOParser = require('shopback-seo-parser');
        const parser = new ShopbackSEOParser({
            defaultRules:[1,3,5]
        });
        parser('./template.html')
            .then((result)=>{
                //Get result.
            });
```

### Customize rules
- Rule format : This mean find the tag img without alt attribute more than 10 tags.
```json
    {
        "tag": {
            "include": "img"
        },
        "attrs": {
            "without": {
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
    const customizeRules = [
        {
            "tag": {
                include: "img"
            },
            attrs: {
                without: {
                    "alt": undefined
                }
            },
            condition: {
                ">": 10        
            }
        }
    ];

    const ShopbackSEOParser = require('shopback-seo-parser');
    const parser = new ShopbackSEOParser({
        rules: customizeRules
    })
    parser.parse('./template.html')
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

&nbsp;&nbsp;│&nbsp;&nbsp;├**html-parser.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**result-parser.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**rules-handler.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**shopback-seo-parser.js**

&nbsp;&nbsp;├**rules**

&nbsp;&nbsp;│&nbsp;&nbsp;├**customize-rules.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**pre-defined-rules.js**


&nbsp;&nbsp;├**error**

&nbsp;&nbsp;│&nbsp;&nbsp;├**sb-seo-errors.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**config-errors.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**rule-errors.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**parse-errors.js**

&nbsp;&nbsp;├**demo**

&nbsp;&nbsp;├**test**

&nbsp;&nbsp;│&nbsp;&nbsp;├**result-parser.mocha.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**shopback-seo-parser.mocha.js**

&nbsp;&nbsp;│&nbsp;&nbsp;├**templates.js**

&nbsp;&nbsp;├**index.js**

&nbsp;&nbsp;├**package.json**

&nbsp;&nbsp;├**README.md**

&nbsp;&nbsp;├**eslintrc.json**

&nbsp;&nbsp;├**LICENSE**

----------
# UnitTest

## Run specified test ##

**step1 install mocha globally**

	npm install mocha -g

**step2 run specified test**
  
	mocha <filepath>.mocha.js

## Run all test suite ##
  
	npm test

----------
*Author: Noah*

*LastUpdated: 8/31/2018 04:56:12 PM*