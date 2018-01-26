// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);
    // Extend it as you need.
    // For example, add typescript loader:

    config.module.rules[2].use = [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                modules: true,
                sourceMap: true,
            },
        },
    ],

    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            loader: require.resolve('awesome-typescript-loader')
        },
        // {
        //     test: /\.css$/,
        //     include: includePath,
        //     use: [
        //       {
        //         loader: 'style-loader',
        //       },
        //       {
        //         loader: 'css-loader',
        //         options: {
        //           sourceMap: true,
        //         },
        //       },
        //     ],
        //   },
        //   {
        //     test: /\.(woff|woff2|eot|ttf|svg)$/,
        //     include: includePath,
        //     use: 'url-loader'
        //   }
    );
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
