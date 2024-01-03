import { compare, hash } from 'bcryptjs';

class crypt {
  hash(value: string) {
    return hash(value, 12);
  }

  matchPassword(value: string, hashedValue: string) {
    return compare(value, hashedValue);
  }
}

export default new crypt();
