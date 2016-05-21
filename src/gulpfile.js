/// <binding AfterBuild='default' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var webroot = "./wwwroot/";
var tsRoot = "./app/";
var modRoot = "./node_modules/";
var ang2 = modRoot + "angular2/bundles/";
var sysJs = modRoot + "systemjs/dist/";

var paths = {
    ts: tsRoot + "**/*.ts",
    dts: tsRoot + "**/*.d.ts",
    jsSrc: [tsRoot + "**/*.js", tsRoot + "**/*.map", tsRoot + "**/*.view.html"],
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    libJs: [
        ang2 + "**/*.js", ang2 + "**/*.map",
        sysJs + "**/*.js", sysJs + "**/*.map",
        modRoot + "angular2/es6/dev/src/testing/shims_for_IE.js",
        modRoot + "es6-shim/es6-shim.*",
        modRoot + "rxjs/bundles/**/Rx*.*"
    ],
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task("client:js", function (cb) {
    return gulp.src(paths.jsSrc, { base: tsRoot })
        .pipe(gulp.dest(webroot + "app"));
});

gulp.task("lib:js", function (cb) {
    return gulp.src(paths.libJs, { base: "./node_modules/" })
        .pipe(gulp.dest(webroot + "lib"));
});

gulp.task("default", function () {
});