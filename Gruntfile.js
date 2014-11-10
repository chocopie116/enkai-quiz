module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json')
        , taskName
    ;

    grunt.initConfig({
        espower: {
            test: {
                files: [
                    {
                    expand: true, //Enable dynamic expansion,
                    cwd: 'test/', //Src matches are relative to this path
                    src: ['**/*.js'], //Actual pattern(s) to match
                    dest: 'espowered/', //Destination path prefix
                    ext: '.js' //Dest filepaths will have this extension
                }
                ]
            }
        }
    });

    for (taskName in pkg.devDependencies) {
        if (taskName.substr(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }
};
