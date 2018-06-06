const webpack = require("webpack");
const config = require("../webpack.config.js");
const path = require("path");

const app = new (require("koa"))();
const router = new (require("koa-router"))();
const port = 3000;

const koaWebpack = require("koa-webpack");

const compiler = webpack(config);

koaWebpack({compiler})
  .then(middleware => {
    app.use(middleware);

    const fs = middleware.devMiddleware.fileSystem;
    router.get("*", async ctx => {
      ctx.type = "html";
      ctx.body = await new Promise((resolve, reject) => {
        fs.readFile(path.join(compiler.outputPath, 'index.html'), (err,file) => {
          if(err) reject(err);
          resolve(file)
        });
      });
    });

    app.use(router.routes());

    app.listen(port, () => {
      console.log(`Listen on port ${port}`);
    });
  });



