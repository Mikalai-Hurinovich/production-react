import webpack from 'webpack';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const tsBabelLoader = buildBabelLoader({ isDev, isTsx: false });
    const tsxBabelLoader = buildBabelLoader({ isDev, isTsx: true });

    const cssLoaders = buildCssLoaders(isDev);

    // No need to use ts loader, use babel loader instead to transpile ts
    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [
        fileLoader,
        svgLoader,
        tsBabelLoader,
        tsxBabelLoader,
        // typescriptLoader,
        ...cssLoaders,
    ];
}
