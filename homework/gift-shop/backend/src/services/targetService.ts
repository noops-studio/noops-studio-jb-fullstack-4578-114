import { Target } from '../models';

class TargetService {
  async getAllTargets() {
    return await Target.findAll();
  }
}

export default new TargetService();
