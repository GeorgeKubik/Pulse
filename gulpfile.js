var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream()); // изменения в браузере
}); //запускается при компеляции

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*html").on("change", gulp.parallel('html'));
}); // следит за изменениями файлов
gulp.task('html', function() { //если изменяется фаил html она обновляется с бомощью браузера синк и перемещается в папку dist
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function() { 
    return gulp.src("src/js**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('img', function() { 
    return gulp.src("src/img**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('mailer', function() { 
    return gulp.src("src/mailer**/*")
        .pipe(gulp.dest("dist/mailer"));
});
// загружаем все файлы в dist и ничего не сработало, точнее картинки не видны, но он картинки отдельно закинул, а иконки отдельно,
//может в это причина??? Так как картинкам досталась свойство .pipe(imagemin()) сжимание картинки


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'img', 'mailer')); // объедилинили первые две команды, чтобы запускать по умолчанию одновременно