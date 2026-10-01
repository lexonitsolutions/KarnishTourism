const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.join(__dirname, "../../data/karnish.db"));
const run = (sql, params = []) => new Promise((resolve, reject) => db.run(sql, params, function (error) { error ? reject(error) : resolve({ id: this.lastID, changes: this.changes }); }));
const get = (sql, params = []) => new Promise((resolve, reject) => db.get(sql, params, (error, row) => error ? reject(error) : resolve(row)));
const all = (sql, params = []) => new Promise((resolve, reject) => db.all(sql, params, (error, rows) => error ? reject(error) : resolve(rows)));
async function initializeDatabase() {
  await run("PRAGMA foreign_keys = ON"); await run("PRAGMA journal_mode = WAL");
  await run("CREATE TABLE IF NOT EXISTS admin_users (id TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'Active',last_login TEXT,created_at TEXT NOT NULL)");
  await run("CREATE TABLE IF NOT EXISTS profiles (id TEXT PRIMARY KEY,full_name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,phone TEXT UNIQUE,password_hash TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'customer' CHECK(role IN ('customer','admin','super_admin','b2b','collaborator')),status TEXT NOT NULL DEFAULT 'active',last_login TEXT,created_at TEXT NOT NULL,updated_at TEXT NOT NULL)");
  await run("CREATE TABLE IF NOT EXISTS resources (id TEXT PRIMARY KEY,resource_type TEXT NOT NULL,title TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'Draft',data TEXT NOT NULL DEFAULT '{}',created_by TEXT,created_at TEXT NOT NULL,updated_at TEXT NOT NULL,FOREIGN KEY(created_by) REFERENCES admin_users(id))");
  await run("CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(resource_type)");
  await run("CREATE TABLE IF NOT EXISTS audit_log (id TEXT PRIMARY KEY,user_id TEXT,action TEXT NOT NULL,resource_type TEXT,resource_id TEXT,details TEXT,created_at TEXT NOT NULL)");
  await run("CREATE TABLE IF NOT EXISTS revoked_tokens (token_id TEXT PRIMARY KEY,expires_at TEXT NOT NULL)");
}
module.exports = { db, run, get, all, initializeDatabase };
