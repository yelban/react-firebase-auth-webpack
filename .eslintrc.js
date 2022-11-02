module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'airbnb',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		//
		'simple-import-sort',
		'import',
		'react',
		'@typescript-eslint',
	],
	rules: {
		// indent: ['error', 'tab'],
		// 'linebreak-style': ['error', 'unix'],
		// quotes: ['error', 'single'],
		// semi: ['error', 'always'],
		'sort-imports': 'off',
		'import/order': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		// 'import/no-unresolved': 'warn', // use eslint-import-resolver-alias
		'no-console': 'off',
		'no-unused-vars': 'warn',
		'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'react/prop-types': 'off',
		'react/no-unknown-property': [
			'warn',
			{
				ignore: ['jsx'],
			},
		], // esolve ESLint: Unknown property 'jsx' found
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			}, // resolve ESLint: Unable to resolve path to module
			webpack: {
				config: './webpack.config.js',
			},
		},
	},
};
