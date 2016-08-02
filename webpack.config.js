module.exports = {
	context : __dirname + '/src',
	entry : [
		'./index.js'
	],
	output : {
		path: __dirname + '/assets/',
		filename: 'bundle.js',
	},
	module: {
		loaders : [
			{
				test:/\.jsx?$/,
				loader :'babel',
				exclude : /node_modules/,
				query: {
					presets:['es2015','react']
				}
			},
			{
				test:/\.css$/,
				loader:"style!css!less"
			}
		]
	}
};