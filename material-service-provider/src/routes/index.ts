import { Express } from 'express';
import file from './file';

export default (app: Express) => {
  file(app);
}