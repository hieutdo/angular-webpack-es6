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
            }
        ]
    }
};