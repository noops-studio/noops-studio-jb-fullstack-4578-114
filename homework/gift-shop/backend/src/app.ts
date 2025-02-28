import express from 'express';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import Sequelize from './config/database';
import config from './config/config';
import logger from './utils/logger';

const app = express();

const PORT = config.port || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
app.use(cors());
app.use(express.json());

app.use('/api', routes);
(async()=>{
    await Sequelize.sync({force:false});

})()

// Global error handler
app.use(errorHandler);

export default app;
