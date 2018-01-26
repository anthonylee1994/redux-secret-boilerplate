const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const dotEnv = require('dotenv').config()

const paths = {
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
    dist: path.resolve(__dirname, "dist"),
};

const env = process.env.NODE_ENV;
const __DEV__ = env === "development";
// const __PRODUCTION__ = env === "production";

const development = {
    context: paths.src,
    devtool: "cheap-module-source-map",
    entry: {
        app: ["react-hot-loader/patch", "./index"]
    },
    output: {
        path: paths.dist,
        publicPath: "/",
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                loaders: ["react-hot-loader/webpack", "awesome-typescript-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            log: "js-logger",
        }),
        new webpack.DefinePlugin({
            "process.env": Object.assign({
                NODE_ENV: JSON.stringify(env),
            }, dotEnv)
            // "process.env.NODE_ENV": JSON.stringify(env),
        }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            env: process.env.DEPLOYMENT_ENV + "|" + process.env.COMMIT_ID + "|" + process.env.NODE_ENV,
            template: "!!handlebars-loader!src/index.hbs",
            inject: true
        }),
        new CopyWebpackPlugin([{ from: paths.public, to: path.resolve(paths.dist, "public"), }])
    ],
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    }
};

const extractStyles = new ExtractTextPlugin({ filename: "[name].[chunkhash].css" });

const production = {
    context: paths.src,
    devtool: "source-map",
    entry: {
        app: "./index"
    },
    output: {
        path: paths.dist,
        publicPath: "/",
        filename: "[name].[chunkhash].js"
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: ["awesome-typescript-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                use: extractStyles.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new webpack.ProvidePlugin({
            log: "js-logger",
        }),
        new webpack.DefinePlugin({
            "process.env": Object.assign({
                env: process.env.DEPLOYMENT_ENV + "|" + process.env.COMMIT_ID + "|" + process.env.NODE_ENV,
                NODE_ENV: JSON.stringify(env),
            }, dotEnv)
            // "process.env.NODE_ENV": JSON.stringify(env),
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            sourceMap: true,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new HtmlWebpackPlugin({
            template: "!!handlebars-loader!src/index.hbs",
            inject: true,
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: false,
            }
        }),
        extractStyles,
        new CopyWebpackPlugin([{ from: paths.public, to: path.resolve(paths.dist, "public"), }])
    ]
};

if (__DEV__) {
    module.exports = development;
} else {
    module.exports = production;
}
