import { Gift } from '../models';

export const getGiftsByTarget = async (targetId: number) => {
  // Special case: if targetId is 0, return all gifts
  if (targetId === 0) {
    return await Gift.findAll();
  }
  // Otherwise, return gifts for the specified target
  return await Gift.findAll({ where: { targetId } });
};

export const addGift = async (giftData: any) => {
  return await Gift.create(giftData);
};

export const deleteGift = async (giftId: number) => {
  return await Gift.destroy({ where: { id: giftId } });
};