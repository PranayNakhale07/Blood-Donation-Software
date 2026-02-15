import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, "blood.db");
  _db = new Database(dbPath);

  _db.pragma("journal_mode = WAL");

  _db.prepare(`
    CREATE TABLE IF NOT EXISTS login (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `).run();

  _db.prepare(`
    CREATE TABLE IF NOT EXISTS enquiry_registration (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT,
      Phone TEXT,
      Aadhar TEXT,
      Address TEXT,
      BloodGroup TEXT,
      Email TEXT,
      created_at TEXT
    )
  `).run();

  _db.prepare(`
    CREATE TABLE IF NOT EXISTS registration (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT,
      PhoneNumber TEXT,
      AdharNumber TEXT,
      Address TEXT,
      Bloodgroup TEXT,
      Sevakendra TEXT,
      DateofBirth TEXT,
      Email TEXT,
      created_at TEXT
    )
  `).run();

  _db.prepare(`
    CREATE TABLE IF NOT EXISTS old_data (
      ID INTEGER PRIMARY KEY,
      Name TEXT,
      Phone TEXT,
      Gender TEXT,
      BloodGroup TEXT,
      Year TEXT,
      Address TEXT,
      Sevakendra TEXT
    )
  `).run();

  return _db;
}

export const db = new Proxy({} as Database.Database, {
  get(target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, instance);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});
