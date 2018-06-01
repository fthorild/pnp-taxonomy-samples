var gulp = require("gulp");
var spsave = require("gulp-spsave");

var coreOptions = {
    siteUrl: 'https://<your tenant>.sharepoint.com/sites/<your site>/'
};

var creds = {
   username: 'mail@tenant.onmicrosoft.com',
   password: '<your password>'
};
gulp.task("save-to-site", function () {
    return gulp.src("./dist/*")
        .pipe(spsave({
            siteUrl: coreOptions.siteUrl,
            folder: "SiteAssets",
            flatten: false
        }, creds));
});
