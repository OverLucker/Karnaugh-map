import _ from 'lodash';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const srcPath = path.join(__dirname, 'src');
const extractCSS = new ExtractTextPlugin('[name]-[hash].css');
const isProd = process.env.NODE_ENV === 'production';
const port = 9009;
const devHostName = 'socialpay.localhost';
const prodHostName = 'socialpay.casin.dev.ktsstudio.ru';
const apiHost = 'socialpay.burashnikov.dev.ktsstudio.ru';
const apiProtocol = 'http://';
const staticResDir = 'assets';
const distDir = 'public';


let entries = {
    app: ['babel-polyfill', path.join(srcPath, 'index.js')],
};

let plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
        'CSSModules': 'react-css-modules',
        'axios': 'axios',
        'React': 'react',
        'cn': 'classnames'
    }),
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: isProd ? '../index.html' : 'index.html',
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': isProd ? JSON.stringify('production') : JSON.stringify('development'),
        },
        IS_PRODUCTION: isProd,
        DOMAIN: isProd ? JSON.stringify(prodHostName) : JSON.stringify(`http://${devHostName}:${port}`),
        API_DOMAIN: JSON.stringify(apiHost),
        API_PROTOCOL: JSON.stringify(apiProtocol),
    }),
    extractCSS
];

if (isProd) {
    plugins = plugins.concat([
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            warnings: false,
            compressor: {
                dead_code: true,
                unused: true,
                keep_fnames: true,
                pure_getters: true,
                unsafe: false,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false,
            },
        }),
    ]);
} else {
    entries = _.mapValues(entries, (item, index) => {
        item.push('webpack/hot/only-dev-server');
        item.push(`webpack-dev-server/client?http://0.0.0.0:${port}`);
        return item;
    });
}

module.exports = {
    context: __dirname,
    entry: entries,
    devtool: isProd ? false : 'source-map',
    output: {
        path: isProd ? path.resolve(`./${distDir}/${staticResDir}/`) : path.resolve(`./${distDir}/`),
        filename: "[name]-[hash].js",
        publicPath: isProd ? `./${staticResDir}/` : `http://${devHostName}:${port}/`,
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: extractCSS.extract({
                    fallbackLoader: 'style-loader',
                    use: [
                        {
                            loader: `css-loader?modules&importLoaders=1&localIdentName=${!isProd ? '[name]__[local]-[hash:base64:5]' : '[local][hash:base64:10]'}`
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel-loader',
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=256'
            }
        ]
    },
    plugins: plugins,
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            'store': `${srcPath}/store`,
            'site': `${srcPath}/site`,
            'utils': `${srcPath}/utils`,
            'config': `${srcPath}/config`,
            'components': `${srcPath}/components`,
            'layouts': `${srcPath}/layouts`,
            'modals': `${srcPath}/site/modals`,
            'dev': `${srcPath}/dev`,
            'img': `${srcPath}/img`,
        }
    },
    devServer: {
        port,
        hot: true,
        inline: true,
        contentBase: srcPath,
        disableHostCheck: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: `${apiProtocol}${apiHost}`,
                onProxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('Host', apiHost);
                }
            },
        },
        https: false,
    }
};
