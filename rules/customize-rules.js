/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/**
 * Customize rules for testing.
 */

const customizeRules = [
    {
        scope: 'body',
        tag: {
            include: 'label',
        },
        attr: {
            without: 'text'
        }
    },
    {
        tag: {
            exclude: 'input',
        },
        attrs: {
            with: {
                type: 'checkbox'
            }
        }
    }, {
        scope: 'head',
        tag: {
            include: 'h6',
        },
        attrs: {
            with: {
                name: '666'
            }
        }
    }, {
        tag: {
            include: 'span',
        },
        condition: {
            '<': 9
        }
    }, {
        tag: {
            include: 'select',
        },
        attr: {
            include: {
                'ng-repeat': ''
            }
        }
    }
];

module.exports = customizeRules;