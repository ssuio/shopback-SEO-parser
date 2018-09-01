/**
 * @author Noah Chou <xssuio@gmail.com>
 */

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

module.exports = rules;