import { Gift } from '../models';

class GiftService {
  async getGiftsByTarget(targetId: number) {
    // Special case: if targetId is 0, return all gifts
    if (targetId === 0) {
      return await Gift.findAll();
    }
    // Otherwise, return gifts for the specified target
    return await Gift.findAll({ where: { targetId } });
  }

  async addGift(giftData: any) {
    return await Gift.create(giftData);
  }

  async deleteGift(giftId: number) {
    return await Gift.destroy({ where: { id: giftId } });
  }
}

export default new GiftService();