import { db } from '../../db';
import { prices } from '../../db/price-schema';

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const authHeader = headers['authorization'] ?? '';

  let token: string = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  if (token !== 'your-token') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: missing or invalid token',
    });
  }

  const ip = headers['x-forwarded-for'] || event.node.req.socket.remoteAddress || 'unknown';

  const body = await readBody(event);

  const insertItem = {
    name: body.name,
    net: +body.net.toFixed(2),
    currency: body.currency,
    vat: +body.vat,
    totalAmount: +body.totalAmount.toFixed(2),
    vatAmount: +body.vatAmount.toFixed(2),
    ip,
    createdAt: new Date().toISOString(),
  };

  await db.insert(prices).values(insertItem);
  return { data: insertItem };
});
