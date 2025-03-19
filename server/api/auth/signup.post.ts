import { defineEventHandler, readBody } from 'h3';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError({ statusCode: 400, message: 'Email in use' });
  }

  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  const hashedPassword = `${salt}.${hash.toString('hex')}`;

  const newUser = await User.create({ name, email, password: hashedPassword });
  return { user: newUser };
});