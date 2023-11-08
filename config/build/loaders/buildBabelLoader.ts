const removeDataTestid = require('../plugins/remove-data-testid');

interface buildBabelLoaderProps {
    isDev?: boolean;
    isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: buildBabelLoaderProps) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['@babel/preset-env', '@babel/preset-typescript'],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true,
                        },
                    ],
                    [
                        '@babel/plugin-transform-typescript',
                        { isTsx },
                    ],
                    '@babel/plugin-transform-runtime',
                    isTsx && removeDataTestid,
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        },
    };
}
