// Eleventy configuration for Bauhaus Revival Portfolio
import { EleventyHtmlBasePlugin } from '@11ty/eleventy';

export default async function (eleventyConfig) {

  // ========================================
  // PLUGINS
  // ========================================
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // ========================================
  // PASSTHROUGH COPY
  // ========================================
  // Copy static files to output directory
  eleventyConfig.addPassthroughCopy({ 'src/css': 'css' });
  eleventyConfig.addPassthroughCopy({ 'src/js': 'js' });
  eleventyConfig.addPassthroughCopy({ 'src/images': 'images' });
  eleventyConfig.addPassthroughCopy({ 'src/fonts': 'fonts' });
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy({ 'src/favicon.svg': 'favicon.svg' });
  eleventyConfig.addPassthroughCopy({ 'src/CNAME': 'CNAME' });
  
  // Watch for image changes
  eleventyConfig.addWatchTarget('src/images/');

  // ========================================
  // WATCH TARGETS
  // ========================================
  // Watch for changes in CSS and JS files
  eleventyConfig.addWatchTarget('src/css/');
  eleventyConfig.addWatchTarget('src/js/');

  // ========================================
  // COLLECTIONS
  // ========================================
  // Blog posts collection
  eleventyConfig.addCollection('blog', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('src/blog/*.md')
      .reverse(); // Most recent first
  });

  // Projects collection
  eleventyConfig.addCollection('projects', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('src/projects/*.md')
      .reverse(); // Most recent first
  });

  // Featured projects (for homepage)
  eleventyConfig.addCollection('featuredProjects', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('src/projects/*.md')
      .filter((item) => item.data.featured === true)
      .reverse();
  });

  // ========================================
  // FILTERS
  // ========================================
  
  // Format dates - flexible formatting
  eleventyConfig.addFilter('dateFormat', function (date, format = 'long') {
    const dateObj = new Date(date);
    
    // Handle different format strings
    if (format === 'YYYY-MM-DD') {
      return dateObj.toISOString().split('T')[0];
    } else if (format === 'MMMM D, YYYY') {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else if (format === 'short') {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } else {
      // Default to long format
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  });

  // Short date format
  eleventyConfig.addFilter('dateShort', function (date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  });

  // ISO date format for datetime attributes
  eleventyConfig.addFilter('dateISO', function (date) {
    return new Date(date).toISOString();
  });

  // Generate excerpt from content
  eleventyConfig.addFilter('excerpt', function (content, length = 200) {
    const excerpt = content.replace(/(<([^>]+)>)/gi, '').substring(0, length);
    return excerpt + (excerpt.length >= length ? '...' : '');
  });

  // Limit array items
  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit);
  });

  // Filter array by property
  eleventyConfig.addFilter('filter', function (array, property, value = true) {
    if (!Array.isArray(array)) return [];
    if (value === undefined) {
      // If no value provided, filter by truthy property
      return array.filter(item => item.data && item.data[property]);
    }
    return array.filter(item => item.data && item.data[property] === value);
  });

  // Get current year
  eleventyConfig.addFilter('currentYear', function () {
    return new Date().getFullYear();
  });

  // Custom filter for GitHub Pages path prefix
  eleventyConfig.addFilter('baseUrl', function (url) {
    const pathPrefix = process.env.PATH_PREFIX || '';
    return pathPrefix ? `${pathPrefix}${url}` : url;
  });

  // Reading time estimate
  eleventyConfig.addFilter('readingTime', function (content) {
    const wordsPerMinute = 200;
    const textContent = content.replace(/(<([^>]+)>)/gi, '');
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  });

  // ========================================
  // MARKDOWN CONFIGURATION
  // ========================================
  const markdownIt = await import('markdown-it');
  eleventyConfig.setLibrary(
    'md',
    markdownIt.default({
      html: true,
      breaks: true,
      linkify: true,
    })
  );

  // ========================================
  // CONFIGURATION
  // ========================================
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_layouts',
      data: '_data',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    
    // Server configuration
    serverOptions: {
      port: 8080,
      host: '0.0.0.0', // Allow access from Docker
    },
    passthroughFileCopy: true,
  };
};
