# Инициализация
+ Инициализация проекта: npm init (--y пропуск вопросов)
+ Установка webpack: ```npm i --save-dev webpack webpack-cli```
+ Создаём файл: ```webpack.config.js```
+ Создаём папку ```src``` и файл ```index.js```, в ней
+ Прописать команды (```build : 'webpack'```)
+ добавить  module: { ```rules: []```},

# HtmlWebpackPlugin
+ Установка HtmlWebpackPlugin: ```npm i -D html-webpack-plugin```
+ Сделать импорт в кофинг: ```const HtmlWebpackPlugin = require('html-webpack-plugin')```
+ Добавить в модуль ключ ```plugins : []```, в котором будут указываться все плагины
+ Конфиг HtmlWebpackPlugin в ```plugins```
```
new HtmlWebpackPlugin({
    title: 'name' (если нужен пустой файл)
    template: 'path' (если уже есть Html файл)
})
```
# Assets
+ созать папку ```Assets``` в корне
+ Добавить в ```modules -> rules```
```{
      test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(woff(2)?|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
```

# SCSS
+ Установка плагинов: ```npm i -D css-loader sass-loader sass mini-css-extract-plugin```
+ Импорт ```const MiniCssExtractPlugin = require('mini-css-extract-plugin');``` в конфиг  
+ Добавить в плагины: ```new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),```  
+ добавить в ```modules -> rules``` 
```{
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }
```
+ добавить рулы:
```
{
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
```
+ чтобы изменить название ```css``` файла в ```dist```, 
```
entry: {
    [название файла]: './src/index.js'},
```
# DevServer
+ Добавить в конфиг:
```
devServer: {
    open: true,
    port: 8080,
    contentBase: path.join(__dirname, 'public'), (если есть паблик)
  },
```
+ Install ```npm install -D webpack-dev-server```
