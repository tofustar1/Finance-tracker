import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb+srv://Admin:Admin123@finance-tracker.orhdtkv.mongodb.net/finance-tracker?retryWrites=true&w=majority'
};

export default config;