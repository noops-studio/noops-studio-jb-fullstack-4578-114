import { Target } from '../models';

export const getAllTargets = async () => {
  return await Target.findAll();
};