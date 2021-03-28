import webpackPreprocessor from '@cypress/webpack-preprocessor';
import webpackConfig from '../../webpack.config';

export default (on, config) => {
  const argv = { mode: process.env.MODE };
  const webpackOptions = webpackConfig(null, argv);
  const options = { webpackOptions };

  on('file:preprocessor', webpackPreprocessor(options));

  return config;
};
