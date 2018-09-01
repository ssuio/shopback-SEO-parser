/**
 * @author Noah Chou <xssuio@gmail.com>
 */

const rules = [
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
    {
        tag: {
            include: 'a',
        },
        attrs: {
            exclude: {
                rel: undefined
            }
        }
    }, {
        scope: 'head',
        tag: {
            include: 'title',
        }
    }, 
    // {
    //     scope: 'head',
    //     tag: {
    //         exclude: 'img',
    //     },
    //     attrs: {
    //         include: {
    //             name: 'description'
    //         }
    //     }
    // }, {
    //     scope: 'head',
    //     tag: {
    //         exclude: 'img',
    //     },
    //     attrs: {
    //         include: {
    //             name: 'keywords'
    //         }
    //     }
    // }, {
    //     tag: {
    //         include: 'strong',
    //     },
    //     condition: {
    //         '>': 15
    //     }
    // }, {
    //     tag: {
    //         include: 'H1',
    //     },
    //     condition: {
    //         '>': 1
    //     }
    // }
];

module.exports = rules;