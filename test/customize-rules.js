const customizeRules = [
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
    },{
        tag: {
            include: 'strong',
        },
        condition: {
            '>': 15
        }
    },{
        tag: {
            include: 'H1',
        },
        condition: {
            '>': 1
        }
    }
];

module.exports = customizeRules;