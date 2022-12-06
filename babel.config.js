module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [
          ".android.js",
          ".js",
          ".ts",
          ".tsx",
          ".json",
          ".svg",
          ".jpg",
        ],
        alias: {
          "@utils": "./src/utils",
          "@styles": "./src/styles",
          "@components": "./src/components",
          "@assets": "./src/assets",
          "@views": "./src/views",
          "@store": "./src/store",
        },
      },
    ],
  ],
};
