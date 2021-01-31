import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as uuid from 'uuid';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import { log } from '../../helper/logger';
import routes from './routes';

dotenv.config();
const app = express();
app.use(compression());
app.use(helmet());

const tid = uuid.v4();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Kasmaji-tid', tid);
  res.locals.tid = tid;

  next();
});

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '3mb', type: 'application/json' }));

routes(app);

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), () => {
  log('info', `Server is running on PORT: ${app.get('port')}`, { tid });
});
