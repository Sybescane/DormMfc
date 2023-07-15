import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class VerificationService {
  private readonly codes: Map<string, string> = new Map();

  generateCode(): string {
    const code = randomBytes(4).toString('hex');
    return code;
  }

  storeCode(email: string, code: string): void {
    this.codes.set(email, code);
  }

  getCode(email: string): string | undefined {
    return this.codes.get(email);
  }

  deleteCode(email: string): void {
    this.codes.delete(email);
  }
}