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
      subcategories TEXT,
      location TEXT,
      city TEXT,
      zip TEXT,
      price REAL,
      contact_email TEXT NOT NULL,
      image_url TEXT,
      is_paid INTEGER NOT NULL DEFAULT 0,
      employment_type TEXT,
      experience_level TEXT,
      company_name TEXT,
      created_at TEXT NOT NULL
    );
  `;

  db.serialize(() => {
    db.run(createSql);
    db.all("PRAGMA table_info(listings)", (err, rows) => {
      if (err) return;
      const existing = new Set(rows.map((row) => row.name));
      const addColumn = (name, type) => {
        if (!existing.has(name)) {
          db.run(`ALTER TABLE listings ADD COLUMN ${name} ${type}`);
        }
      };
      addColumn("subcategories", "TEXT");
      addColumn("location", "TEXT");
      addColumn("city", "TEXT");
      addColumn("zip", "TEXT");
      addColumn("employment_type", "TEXT");
      addColumn("experience_level", "TEXT");
      addColumn("company_name", "TEXT");
    });
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
