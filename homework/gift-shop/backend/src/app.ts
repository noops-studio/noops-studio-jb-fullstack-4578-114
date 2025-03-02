import express from 'express';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import { sequelize } from './models';
import config from './config/config';
import logger from './utils/logger';

const app = express();

const PORT = config.port || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// Global error handler
app.use(errorHandler);

// Start the server and sync the database
(async () => {
  try {
    await sequelize.sync({ force: false });
    logger.info('Database synchronized');
    
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.info(`Failed to start server: ${error}`);
  }
})();

export default app;