import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './price-schema';

const sqlite = new Database('db/app.db');

const tableCheck = sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='prices';").get();
if (!tableCheck) {
  sqlite
    .prepare(
      `CREATE TABLE prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        net REAL NOT NULL,
        currency TEXT NOT NULL,
        vat REAL NOT NULL,
        totalAmount REAL NOT NULL,
        vatAmount REAL NOT NULL,
        ip TEXT NOT NULL,
        createdAt TEXT DEFAULT (datetime('now'))
      );`
    )
    .run();
}

export const db = drizzle(sqlite, { schema });
