module.exports = function (api) {
    const presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    ie: 11,
                },
                useBuiltIns: 'entry',
            },
        ],
        ['@babel/preset-react', { development: !api.env('production'), },]
    ];
    const plugins = [
        '@babel/plugin-proposal-function-bind',
        '@babel/plugin-proposal-exoprt-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-export-class-properties',
    ];

    return {
        presets,
        plugins,
    };
};