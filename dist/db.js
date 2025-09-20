import { getDatabase } from "./init_db.js";
import { Low } from "lowdb";
;
;
const MISSING = -1;
/**
 * Returns -1 if a mark existed, and replace wasn't specified.
 * Returns 0 if mark was saved successfully, a NEW mark was created
 * Returns 1 if an existing mark was UPDATED
 * Throws error if saving failed due to a database error
 */
export async function saveMark(markTag, filePath, replace) {
    let db = await getDatabase();
    const index = findIndex(markTag, db);
    // do not overwrite if replace wasn't specified
    if (index !== MISSING && !replace) {
        return -1;
    }
    // either replacing existing or adding for the first time
    try {
        await db.update(({ marks }) => {
            marks.push({ mark: markTag, path: filePath });
        });
    }
    catch (e) {
        throw new Error("Could not save file");
    }
    if (index === -1) {
        return 0;
    }
    else {
        return 1;
    }
}
// 
export async function deleteMark(markTag) {
    let db = await getDatabase();
    const index = findIndex(markTag, db);
    if (index === MISSING) {
        return "";
    }
    let path = "[could not read file]";
    try {
        await db.update((marks) => {
            path = marks.marks[index].path;
            marks.marks.splice(index, 1);
        });
    }
    catch (e) {
        throw new Error("could not delete mark");
    }
    return path;
}
// export function updateMark(mark: string, filePath: string) {
//
// }
export async function listAll() {
    let db = await getDatabase();
    return db.data.marks;
}
function findIndex(markTag, db) {
    return db.data.marks.findIndex((mark) => mark.mark === markTag);
}
export async function getMark(markTag) {
    let db = await getDatabase();
    const index = findIndex(markTag, db);
    if (index === -1) {
        return "";
    }
    return db.data.marks[index].path;
}
//# sourceMappingURL=db.js.map