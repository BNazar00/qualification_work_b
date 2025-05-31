const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#FA8C16',
                            '@button-color': '#FA8C16',
                            '@link-color': '#000',
                            '@text-color': '#000',
                            '@primary-hover-color': '#FA8C16',
                            '@primary-hover-color_2': '#FFA940',
                            '@menu-highlight-color': '#FFF'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};

