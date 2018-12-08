
module.exports = {
    entry: './dist/public/app.js',
    output: {
        path: __dirname + '/dist/public',
        filename: 'app-bundle.js',
    },
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.webpack.js'],
    },
    module: {
        rules: [
            {
                use: { loader: 'ts-loader' }
            }
        ]
    }
}