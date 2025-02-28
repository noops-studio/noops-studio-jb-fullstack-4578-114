import api from './api';
import { Gift } from '../models/Gift';

const getGiftsByTarget = async (targetId: number): Promise<Gift[]> => {
  const response = await api.get(`/gifts/${targetId}`);
  return response.data;
};

const addGift = async (gift: Partial<Gift>): Promise<Gift> => {
  const response = await api.post('/gifts', gift);
  return response.data;
};

const deleteGift = async (id: number): Promise<void> => {
  await api.delete(`/gifts/${id}`);
};

export default { getGiftsByTarget, addGift, deleteGift };
