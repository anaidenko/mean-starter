import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';

import * as config from './config';
import { expressHandler, HttpError } from './modules/errors';
import { authService } from './modules/security';
import apiRoutes from './routes/api';

const app: express.Express = express();

config.init();

mongoose.connect(config.MongoUrl);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(config.Debug ? 'dev' : 'combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.use(authService.initialize());
app.use(apiRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new HttpError.NotFound());
});

// error handlers
app.use(expressHandler);

export default app;
