import sqlite3 from "sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const DB_PATH = new URL("../data/listings.db", import.meta.url).pathname;
mkdirSync(dirname(DB_PATH), { recursive: true });

sqlite3.verbose();

export const db = new sqlite3.Database(DB_PATH);

export function initDb() {
  const createSql = `
    CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL,
      contact_email TEXT NOT NULL,
      image_url TEXT,
      is_paid INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `;

  db.serialize(() => {
    db.run(createSql);
  });
}

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
