import { DB } from "../../deps.ts";

export const databaseFileName = "tnab.db";

export function setupDatabase() {
    console.log('[Bot] setup database started');
    useDb((db) => {
        db.execute(`
            CREATE TABLE IF NOT EXISTS settings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                version INTEGER DEFAULT 0 NOT NULL
            )
        `);

        const settingsResult = db.query('SELECT [version] FROM settings LIMIT 1');
        let version = settingsResult.length > 0 ? settingsResult[0][0] as number : 0;
        if (version < 1) {
            version = 1;
            db.transaction(() => {
                db.query('INSERT INTO settings (version) VALUES (?)', [version]);
                db.execute(`
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT,
                        discordId TEXT,
                        messageCount INTEGER DEFAULT 0 NOT NULL,
                        reactionCount  INTEGER DEFAULT 0 NOT NULL,
                        ignore BOOLEAN DEFAULT 0
                    )
                `);
            });

            console.log('[Bot] Updated database to version 1')
        }

        console.log('[Bot] setup database completed');
    });
}

export function useDb(dbUsage: (db: DB, isWrite?: boolean) => void) {
    if (!dbUsage) {
        return;
    }
    const db = new DB(databaseFileName);
    try {
        dbUsage(db);
    }
    catch (err) {
        console.warn('[Bot] DB usage failed', err);
    }

    db.close();
}