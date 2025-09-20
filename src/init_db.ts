import fs from "fs/promises";
import path from "node:path";
import os from "node:os";
import { JSONFilePreset } from "lowdb/node";
import { Low } from "lowdb";
import type { MarkCollection } from "./db.js";
let db: Low<MarkCollection> | null = null;

async function ensureDirectoryExists(path: string) {
    try {
        await fs.access(path);
    } catch (e) {
        fs.mkdir(path);
    }
}

export async function getDatabase(): Promise<Low<MarkCollection>> {

    if (db !== null) {
        return db;
    }
    const configDir = path.join(os.homedir(), '.marker');
    await ensureDirectoryExists(configDir);
    const dataFile = path.join(configDir, 'marker_data.json');


    const defaultData: MarkCollection = { marks: [] }
    db = await JSONFilePreset(dataFile, defaultData)

    return db;
}
