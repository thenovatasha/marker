export interface MarkCollection {
    marks: Mark[];
}
export interface Mark {
    mark: string;
    path: string;
}
/**
 * Returns -1 if a mark existed, and replace wasn't specified.
 * Returns 0 if mark was saved successfully, a NEW mark was created
 * Returns 1 if an existing mark was UPDATED
 * Throws error if saving failed due to a database error
 */
export declare function saveMark(markTag: string, filePath: string, replace: boolean): Promise<1 | -1 | 0>;
export declare function deleteMark(markTag: string): Promise<string>;
export declare function listAll(): Promise<Mark[]>;
export declare function getMark(markTag: string): Promise<string>;
//# sourceMappingURL=db.d.ts.map