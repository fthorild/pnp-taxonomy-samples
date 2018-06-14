var gulp = require("gulp");
var spsave = require("gulp-spsave");

var coreOptions = {
    siteUrl: 'https://acmebiz.sharepoint.com/sites/acdc/bp/'
};

var creds = {
   username: 'fredrik.thorild@acmebiz.onmicrosoft.com',
   password: 'Sogeti00'
};
gulp.task("save-to-site", function () {
    return gulp.src("./dist/*")
        .pipe(spsave({
            siteUrl: coreOptions.siteUrl,
            folder: "SiteAssets",
            flatten: false
        }, creds));
        
});
