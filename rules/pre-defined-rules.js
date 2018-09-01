/**
 * @author Noah Chou <xssuio@gmail.com>
 */

const rules = [
    {
        include: {
            tag: 'img'
        },
        exclude: {
            attr: {
                alt: undefined
            }
        }
    },
    {
        include: {
            tag: 'a'
        },
        exclude: {
            attr: {
                rel: undefined
            }
        }
    },
    {
        scope: 'head',
        include: {},
        exclude: {
            tag: 'title'
        }
    },
    {
        scope: 'head',
        include: {},
        exclude: {
            tag: 'meta',
            attr: {
                name: 'descriptions'
            }
        }
    },
    {
        scope: 'head',
        include: {},
        exclude: {
            tag: 'meta',
            attr: {
                name: 'keywords'
            }
        }
    },
    {
        include: {
            tag: 'strong'
        },
        exclude: {},
        condition: {
            '>': 15
        }
    },
    {
        scope: 'head',
        include: {},
        exclude: {
            tag: 'meta',
            attr: {
                name: 'keywords'
            }
        },
        condition: {
            '>': 1
        }
    },
];

module.exports = rules;