const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotEnv = require('dotenv').config();

const paths = {
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
    dist: path.resolve(__dirname, "dist"),
};

const env = process.env.NODE_ENV;
const __DEV__ = (env === "development");

const extractStyles = new ExtractTextPlugin({ filename: "[name].[chunkhash].css" });
const configs = {
    context: paths.src,
    devtool: __DEV__ ? "cheap-module-source-map" : "source-map",
    entry: {
        app: (() => {
            if (__DEV__) {
                return ["react-hot-loader/patch", "./index"];
            }
            return "./index";
        })(),
    },
    output: {
        path: paths.dist,
        publicPath: "/",
        filename: __DEV__ ? "[name].bundle.js" : "[name].[chunkhash].js"
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
                use: (function () {
                    if (__DEV__) {
                        return [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
                    }
                    return extractStyles.extract({
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
                })(),
            }
        ]
    },
    plugins: (function () {
        const plugins = [
            new webpack.ProvidePlugin({
                log: "js-logger",
            }),
            new webpack.DefinePlugin({
                "process.env": Object.assign({
                    NODE_ENV: JSON.stringify(env),
                }, dotEnv)
            }),
            new HtmlWebpackPlugin({
                env: "(" + process.env.DEPLOYMENT_ENV + "|" + process.env.COMMIT_ID + "|" + process.env.NODE_ENV + ")",
                template: "!!handlebars-loader!src/index.hbs",
                inject: true,
                minify: {
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                }
            }),
            new CopyWebpackPlugin([{ from: paths.public, to: path.resolve(paths.dist, "public"), }])
        ];
        if (__DEV__) {
            plugins.push(
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NamedModulesPlugin(),
            );
        } else {
            plugins.push(
                new CleanWebpackPlugin(["dist"]),
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
                extractStyles,
            );
        }
        return plugins;
    })(),
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
}

module.exports = configs;
