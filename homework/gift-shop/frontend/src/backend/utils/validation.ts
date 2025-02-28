export const validateGift = (gift: {
    targetId: number;
    name: string;
    description: string;
    price: number;
    discount: number;
  }) => {
    const errors: string[] = [];
    if (!gift.targetId) errors.push('Target is required.');
    if (!gift.name) errors.push('Name is required.');
    if (!gift.description) errors.push('Description is required.');
    if (gift.price == null || gift.price < 0) errors.push('Price must be non-negative.');
    if (gift.discount == null || gift.discount < 0 || gift.discount > 100) errors.push('Discount must be between 0 and 100.');
    return errors;
  };
  