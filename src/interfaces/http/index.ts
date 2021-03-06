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
app.use(cors({ origin: '*' }));

const tid = uuid.v4();

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '3mb', type: 'application/json' }));

routes(app);

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), () => {
  log('info', `Server is running on PORT: ${app.get('port')}`, { tid });
});
