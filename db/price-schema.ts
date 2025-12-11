import { sql } from 'drizzle-orm';
import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';

export const prices = sqliteTable('prices', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('product_name').notNull(),
  net: real('net').notNull(),
  currency: text('currency').notNull(),
  vat: real('vat').notNull(),
  totalAmount: real('total_amount').notNull(),
  vatAmount: real('vat_amount').notNull(),
  ip: text('ip').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
