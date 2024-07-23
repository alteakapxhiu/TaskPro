const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
  sourceExts: ['js','json','ts','tsx','jsx','cjs'],
  },
};