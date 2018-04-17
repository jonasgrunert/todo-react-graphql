module.exports = {
    entry: [
      'babel-polyfill',
      './index.js',
    ],
    output: {
      filename: 'bundle.js',
      publicPath: '/build/',
      path: __dirname + '/build',
    },
  
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
      // Add '.js' and '.jsx' as resolvable extensions.
      extensions: ['*', '.js', '.jsx', '.json'],
    },
  
    module: {
      rules: [
        // Babel
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        { test: /\.sass$/, 
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }]
        },
      ],
    },
  
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-redux': 'ReactRedux',
      'redux': 'Redux',
      'redux-form': 'ReduxForm',
    },
  };
  