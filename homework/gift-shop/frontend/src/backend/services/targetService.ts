import api from './api';
import { Target } from '../models/Target';

const getTargets = async (): Promise<Target[]> => {
  const response = await api.get('/targets');
  return response.data as Target[];
};

export default { getTargets };

