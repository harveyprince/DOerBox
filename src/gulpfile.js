const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const del = require('del');

const named = require('vinyl-named');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('public/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});
gulp.task('images', () => {
  return gulp.src('public/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});
gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('pubilc/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});
gulp.task('scripts', () => {
  return gulp.src('public/scripts/**/*.ori.js')
      .pipe(named())
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe(reload({stream: true}));
});
gulp.task('pack_scripts', () => {
  return gulp.src('public/scripts/**/*.pack.js')
      .pipe(named())
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe(reload({stream: true}));
});
gulp.task('dev', () => {
    $.nodemon({
        script: './bin/www',
        watch: ['app.js','bin/www','routes/**/*.js'],
    }).on('restart', () => {
        console.log('server restarted');
    });
});
gulp.task('serve', ['images', 'fonts', 'styles', 'pack_scripts', 'scripts', 'dev'], () => {
  browserSync({
    notify: false,
    port: 9000,
    proxy: "localhost:3000"
  });
  gulp.watch([
    'views/**/*',
    'public/images/**/*',
    '.tmp/fonts/**/*',
  ]).on('change', reload);
  gulp.watch('public/styles/**/*.scss', ['styles']);
  gulp.watch('public/scripts/**/*.pack.js', ['pack_scripts']);
  gulp.watch('public/scripts/**/*.ori.js', ['scripts']);
  gulp.watch('public/fonts/**/*', ['fonts']);

});
