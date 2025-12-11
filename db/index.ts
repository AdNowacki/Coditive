import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './price-schema';

const sqlite = new Database('app.db');

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
        total_amount REAL NOT NULL,
        vat_amount REAL NOT NULL,
        ip TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );`
    )
    .run();
}
export const db = drizzle(sqlite, { schema });
