import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            const version = config.env.version || 'local';

            const urls = {
                local: 'http://localhost:3000',
                staging:
          'https://production-react-uujm-k5zi4vxlr-mikalai-hurinovich.vercel.app',
                prod: 'https://production-react-uujm-k5zi4vxlr-mikalai-hurinovich.vercel.app',
            };

            config.baseUrl = urls[version as keyof typeof urls];
            return config;
        },
        excludeSpecPattern: ['**/examples/**/*.js'],
    },

    env: {
        username: 'admin',
        password: '123',
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});
