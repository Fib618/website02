import path from 'path';
import webpack from 'webpack';


export default (env, args) => {
    const isProduction = args && arg.mode == 'production';
    const devtool = !isProduction && 'inline-source-map';
    const sourceMap = !isProduction;
    const rules = [
        {
            test: /\.jsx?$/,
            exclude: /node?modules/,
            use: 'babel-loader',
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: { sourceMap },
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap,
                        paths: [
                            path.resolve(pFath.jooin(__dirname, './src/styles')),
                            path.resolve(path.join(__dirname, './src/components')),
                        ],
                    },
                },
            ],
        },
        {
            test: /\.(eot|woff|woff2|tff|svg|png|jpe?g|gif)(\?\S*)?$/,
            use: [{ loader: 'url-loader', options: { limit: 100000 } }],
        }
    ];

    if (!isProduction) {
        rules.unshift({
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: { configFile: path.join(__dirname, './src/.eslintrc.js') },
        });
    }

    return {
        devtool,
        entry: {
            'public/js/login': ['./src/entries/login.jsx'],
            'public_authenticated/js/app': ['./src/entries/app.jsx'],
        },
        output: {
            path: path.join(__dirname, './'),
            filename: '[name].js',
        },
        module: { rules },
        watchOptions: {
            ignored: /node_modules/,
        },
        resolve: {
            modules: ['node_modules'],
            alias: {
                '~': path.join(__dirname, './src'),
            },
            extentions: ['./js', 'jsx', './css', './less'],
        },
    };
};