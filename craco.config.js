const path = require('path');
const { ESLINT_MODES } = require('@craco/craco');

function hasNested(obj, ...levels) {
	for (const level of levels) {
		if (!obj || !obj.hasOwnProperty(level)) return false;
		obj = obj[level];
	}
	return true;
}

module.exports = {
	babel: {
		loaderOptions: (babelOptions) => ({
			...babelOptions,

			/* Define custom preset which overrides CRA's original `babel-preset-react-app` */
			presets: [
				[
					() => {
						// noinspection NpmUsedModulesInstalled
						const reactAppPreset = require('babel-preset-react-app')();

						/* Remove the last preset defined by CRA which is `@babel/preset-typescript` */
						reactAppPreset.presets.pop();

						// noinspection NpmUsedModulesInstalled
						reactAppPreset.presets = [...reactAppPreset.presets, [require('@babel/preset-typescript'), { allowNamespaces: true }]];

						return reactAppPreset;
					},
				],
			],
		}),
	},
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		},
	},
	style: {
		css: {
			loaderOptions: {
				localsConvention: 'camelCase',
			},
		},
	},
	eslint: {
		mode: ESLINT_MODES.file,
		loaderOptions: (eslintOptions) => {
			return {
				...eslintOptions,
				emitWarning: true,
			};
		},
	},
	jest: {
		configure: {
			moduleNameMapper: {
				'^@/(.*)$': '<rootDir>/src/$1',
			},
		},
	},
	plugins: [
		{
			plugin: {
				/* Search and override the removeComments configuration property from the HtmlWebpackPlugin's output */
				overrideWebpackConfig: ({ webpackConfig }) => {
					webpackConfig.plugins.forEach((plugin) => {
						if (hasNested(plugin, 'options', 'minify', 'removeComments')) {
							plugin.options.minify.removeComments = false;
						}
					});

					return webpackConfig;
				},
			},
		},
	],
};
