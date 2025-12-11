import { desc } from 'drizzle-orm';
import { db } from '../../db';
import { prices } from '../../db/price-schema';

export default defineEventHandler(async () => {
  return await db.select().from(prices).orderBy(desc(prices.createdAt));
});
