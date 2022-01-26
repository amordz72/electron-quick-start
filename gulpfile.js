const { src, dest, parallel, series, watch, gulp } = require("gulp"); //parallel=sync//series= async
const plugin_pug = require("gulp-pug");
const rename = require("gulp-rename"); //تسمية الملفات
const concat = require("gulp-concat"); //دمج الملفات
var sass = require("gulp-sass")(require("sass"));
var sourcemaps = require("gulp-sourcemaps"); //لاضهار خريطة الملفات
var uglify = require("gulp-uglify"); //ضغط ملفات الجافا سكريبت
const html2pug = require("gulp-html2pug");
var project = 'martship/'
var my_src = "src/" + project;
var my_dist = "dist/" + project;

const buildHtml2pug = () => {
  return src(my_src + "html2pug/*.html")
    .pipe(html2pug(/* options for html2pug such as { fragment: true } */))
    .pipe(dest(my_dist + "html2pug/"));
};


const buildPug2html = () => {
  return src(my_src + "pug/**/*.pug")
    .pipe(sourcemaps.init())
    .pipe(plugin_pug("src/pug/**/*.pug"))
    .pipe(dest(my_dist + "."));
};

function buildStyles() {
  return src(my_src + "sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(my_dist + "css/"));
}
const js = () => {
  return (
    src(my_src + "js/**/*.js")
      .pipe(sourcemaps.init())
      //  .pipe( concat("all.js"))
      // .pipe(rename({ basename: "main.js" }))
      .pipe(uglify())
      .pipe(dest(my_dist + "js/"))

  );
};

const watcher = (cb) => {
  watch(my_src + "**/*.pug", buildPug2html);
  watch(my_src + "sass/**/*.scss", buildStyles);
  watch(my_src + "**/*.html", buildHtml2pug);

  watch(my_src + "js/**/*.js", js);


  cb();
};

module.exports = {
  default: watcher,
};
