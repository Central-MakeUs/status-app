import { ConfigPlugin } from 'expo/config-plugins';
import withAndroidPlugin from './withAndroidPlugin';

const withPlugin: ConfigPlugin = (config) => {
  return withAndroidPlugin(config);
};

export default withPlugin;
