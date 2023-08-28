module.exports = {
  src: {
    html: 'src/html/pages/**/*.+(html|nunjucks)',
    css: 'src/sass/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*',
    fonts: 'src/fonts/**/*',
    php: 'src/*.php',
  },
  watch: {
    html: 'src/html/**/*.html',
    css: 'src/sass/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*',
    fonts: 'src/fonts/**/*',
    php: 'src/*.php',
  },
  build: {
    html: 'build/',
    css: 'build/css',
    js: 'build/js',
    images: 'build/images',
    fonts: 'build/fonts',
    php: 'build/',
  },
  inject: {
    html: 'build/index.html',
    css: 'build/css/**/*.css',
    js: 'build/js/**/*.js',
  },
  clean: 'build/',
};
