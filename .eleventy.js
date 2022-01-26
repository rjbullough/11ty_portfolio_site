const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const now = String(Date.now());

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./styles/tailwind.config.js");
  eleventyConfig.addWatchTarget("./styles/tailwind.css");
  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/cdn.js": "./js/alpine.js",
  });
  eleventyConfig.addPassthroughCopy("./src/images/");
  eleventyConfig.addShortcode("version", function () {
    return now;
  });
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
      layouts: "_layouts",
    },
  };
};
