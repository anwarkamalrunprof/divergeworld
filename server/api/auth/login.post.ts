import { defineEventHandler, readBody } from 'h3';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = await User.findOne({ email });
  if (!user) {
    throw createError({ statusCode: 400, message: 'Invalid credentials' });
  }

  const [salt, storedHashPassword] = user.password.split('.');
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  if (storedHashPassword !== hash.toString('hex')) {
    throw createError({ statusCode: 400, message: 'Invalid credentials' });
  }

  return { user };
});
