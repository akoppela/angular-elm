module.exports = {
    modules: {
        autoRequire: {
            'app.js': ['main']
        }   
    },
    files: {
        javascripts: {
            joinTo: {
                'app.js': [
                    /^app|^build/
                ],
                'vendor.js': [
                    'node_modules/process/browser.js',
                    'vendor/angular/angular.js'
                ]
            }
        }
    },
    paths: {
        public: 'dist',
        watched: ['app', 'build', 'vendor']
    },
    plugins: {
        elmBrunch: {
            mainModules: ['app/Main.elm'],
            outputFolder: 'build',
            outputFile: 'elm.js',
            makeParameters: [
                '--debug'
            ]
        },
        autoReload: { enabled: true },
        beforeBrunch: [
            'rm -rf dist'
        ]
    }
};