const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const string = require("string");

const now = String(Date.now());
const slugify = (s) => string(s).slugify().toString();

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};

const markdownLib = markdownIt(markdownItOptions)
  .use(markdownItAttrs)
  .use(markdownItAnchor, {
    slugify: slugify,
    permalink: true,
    permalinkClass: "direct-link text-black/50 hover:text-black/100 transition",
    permalinkSymbol: "#",
  });

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addWatchTarget("./styles/tailwind.config.js");
  eleventyConfig.addWatchTarget("./styles/tailwind.css");
  eleventyConfig.addPassthroughCopy("./src/images/");
  eleventyConfig.addPassthroughCopy("./src/js/");
  eleventyConfig.addPassthroughCopy("./src/browserconfig.xml");
  eleventyConfig.addPassthroughCopy("./src/site.webmanifest");
  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/cdn.js": "./js/alpine.js",
  });

  eleventyConfig.cloudinaryCloudName = "ryan-bullough";
  eleventyConfig.srcsetWidths = [
    { w: 400, v: 400 },
    { w: 600, v: 600 },
    { w: 768, v: 768 },
    { w: 820, v: 820 },
    { w: 1240, v: 1240 },
    { w: 1440, v: 1440 },
    { w: 1920, v: 1920 },
  ];
  eleventyConfig.fallbackWidth = 800;
  eleventyConfig.format = "webp";

  // Shortcodes
  eleventyConfig.addShortcode("version", function () {
    return now;
  });

  eleventyConfig.addShortcode("thisYear", function () {
    const d = new Date();
    return String(d.getFullYear());
  });

  eleventyConfig.addShortcode("respimg", (path, alt, style) => {
    const fetchBase = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`;
    const src = `${fetchBase}q_auto,f_auto,w_400/${path}.${eleventyConfig.format}`;
    const srcset = eleventyConfig.srcsetWidths
      .map(({ w, v }) => {
        return `${fetchBase}dpr_auto,q_auto,w_${w}/${path}.${eleventyConfig.format} ${v}w`;
      })
      .join(", ");

    return `<img class="${
      style ? style : ""
    }" loading="lazy" src="${src}" srcset="${srcset}" alt="${
      alt ? alt : ""
    }" width="400" height="300" sizes="100vw">`;
  });

  eleventyConfig.addShortcode("figure", (path, alt, caption) => {
    const fetchBase = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`;
    const src = `${fetchBase}q_auto,f_auto,w_400/${path}.${eleventyConfig.format}`;

    const srcset = eleventyConfig.srcsetWidths
      .map(({ w, v }) => {
        return `${fetchBase}dpr_auto,q_auto,w_${w}/${path}.${eleventyConfig.format} ${v}w`;
      })
      .join(", ");

    return `<figure class=""><img class="zoomable" loading="lazy" src="${src}" srcset="${srcset}" alt="${
      alt ? alt : ""
    }" width="400" height="300"><figcaption class="text-center text-sm mt-3 text-gray-600">${
      caption ? caption : ""
    }</figcaption></figure>`;
  });

  eleventyConfig.addShortcode("pagebreak", () => {
    return `<div class="mt-14 mb-6 flex justify-center">
      <span class="inline-block w-1 h-1 bg-pink-500 rounded mr-5"></span>
      <span class="inline-block w-1 h-1 bg-pink-500 rounded mr-5"></span>
      <span class="inline-block w-1 h-1 bg-pink-500 rounded"></span>
    </div>`;
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
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
