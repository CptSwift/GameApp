const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const htmlPlugin = new HTMLWebPackPlugin({
	template: path.join(__dirname, './src/index.html'),
	filename: 'index.html'
})

const vuePlugin = new VueLoaderPlugin()

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/index.js'), // 项目入口文件
	output: { // 指定输出选项
		path: path.join(__dirname, './dist'), // 输出路径
		filename: 'bundle.js' // 指定输出文件的名称
	},
	plugins: [
		htmlPlugin,
		vuePlugin
	],
	module: {
		rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				},
				exclude: path.resolve('node_modules')
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					minimize: true
				}
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader']
			}, // 处理 CSS 文件的 loader
			{
				test: /\.less$/,
				loaders: ['style-loader', 'css-loader', 'less-loader']
			}, // 处理 less 文件的 loader
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}, // 处理 scss 文件的 loader
			{
				test: /\.(jpg|png|gif|bmp|jpeg)$/,
				loader: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]'
			}, // 处理 图片路径的 loader
			// limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
			{
				test: /\.(ttf|eot|svg|woff|woff2)$/,
				loader: 'url-loader'
			}, // 处理 字体文件的 loader
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json', '.vue'],
		alias: {
			'@': path.join(__dirname, './src'),
			'vue$': 'vue/dist/vue.js'
		}
	}
}