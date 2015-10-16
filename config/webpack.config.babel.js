import path from 'path';

export default {
    entry: [
        'webpack/hot/dev-server',
        path.resolve(__dirname, '../app/app.js')
    ],
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, '../app')
                ],
                loader: 'babel'
            },
            {
                test: /\.html$/,
                loader: `ngtemplate?relativeTo=${path.resolve(__dirname, '../app')}/!html`
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&name=fonts/[name].[ext]"
            }
        ]
    }
};