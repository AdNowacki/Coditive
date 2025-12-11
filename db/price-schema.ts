import { sql } from 'drizzle-orm';
import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';

export const prices = sqliteTable('prices', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  net: real('net').notNull(),
  currency: text('currency').notNull(),
  vat: text('vat').notNull(),
  totalAmount: real('totalAmount').notNull(),
  vatAmount: real('vatAmount').notNull(),
  ip: text('ip').notNull(),
  createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
});
