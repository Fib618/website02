module.exports = {
    env: {
        blowser: true,
    },
    parser: 'babel-selint',
    settings: {
        'import/resolver':{
            webpack: {
                config: 'webpack.config.babel.js',
            }
        },
        react : {
            pragma: 'React',
            version: '16.7'
        },
    },
    
};