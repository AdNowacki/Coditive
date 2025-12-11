import { db } from '../../db';
import { prices } from '../../db/price-schema';
import type { TPriceRequestBody } from '../../app/types';

const validationRequest = (body: TPriceRequestBody, token: string) => {
  if (token !== '100923') {
    return {
      statusCode: 403,
      statusMessage: 'Forbidden',
    };
  }

  if (!body || !body.name || !body.net || !body.currency || !body.vat || !body.totalAmount || !body.vatAmount) {
    return {
      statusCode: 400,
      statusMessage: 'Bad Request',
    };
  }

  return {};
};

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const authHeader = headers['authorization'] ?? '';
  const body = await readBody(event);

  let token: string = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  const validation = validationRequest(body, token);
  if (Object.keys(validation).length > 0) throw createError(validation);

  const ip = headers['x-forwarded-for'] || event.node.req.socket.remoteAddress || 'unknown';

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
