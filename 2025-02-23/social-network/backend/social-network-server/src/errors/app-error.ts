import { ReasonPhrases } from "http-status-codes";

export default class AppError extends Error {
  constructor(public status: number, message?: string) {
    super(message || ReasonPhrases[status]);
  }
}
