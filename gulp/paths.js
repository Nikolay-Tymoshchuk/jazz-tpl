module.exports = {
  src: {
    html: 'src/html/pages/**/*.+(html|nunjucks)',
    css: 'src/assets/scss/*.scss',
    js: 'src/assets/js/**/*.js',
    images: 'src/assets/images/**/*',
    fonts: 'src/assets/fonts/**/*',
    data: 'src/data.json',
    php: 'src/**/*.php',
  },
  watch: {
    html: 'src/html/**/*.html',
    css: 'src/assets/scss/**/*.scss',
    js: 'src/assets/js/**/*.js',
    images: 'src/assets/images/**/*',
    fonts: 'src/assets/fonts/**/*',
    data: 'src/data.json',
  },
  build: {
    html: 'build/',
    css: 'build/assets/css/',
    js: 'build/assets/js/',
    fonts: 'build/assets/fonts/',
    images: 'build/assets/images/',
    php: 'build/',
  },
  clean: 'build/',
};
