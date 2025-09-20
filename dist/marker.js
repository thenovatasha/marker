#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { deleteMark, getMark, listAll, saveMark } from "./db.js";
import { cwd } from "node:process";
const program = new Command();
program
    .name('marker')
    .description('Manage directory navigation by setting marks')
    .version('0.1.0');
// marker mark ---- marks and returns a nice message
program.command('mark')
    .description('Mark the current directory with a mark (tag)')
    .argument('<mark>', 'A unique name for this directory')
    .option('-r, --replace', 'If the mark is already taken, overwrite it', false)
    .action(mark);
// marker ls ------ lists all the marks
program.command('ls')
    .description('List the marks')
    .action(list_marks);
// marker get ----- returns a specific filepath (full)
program.command('get')
    .description('Get the fully qualified path to the mark')
    .argument('<mark>', 'The tag to find')
    .action(get_mark);
// rm -- returns a nice unmark message
program.command('rm')
    .description('Remove the associated mark and directory')
    .argument('<mark>', 'The mark to remove')
    .action(remove_mark);
program.parse();
function printFail(str) {
    return chalk.red.bold(str);
}
function printSuccess(str) {
    return chalk.green.bold(str);
}
function printInfo(str) {
    return chalk.blue.bold(str);
}
function printCode(str) {
    return chalk.yellow.bold(str);
}
function printPath(str) {
    return chalk.cyan(str);
}
async function mark(mark, options) {
    let dir = cwd();
    try {
        const result = await saveMark(mark, dir, options.replace);
        if (result === 0) {
            console.log(printSuccess(` ✓ Mark '${mark}' created successfully`));
            console.log(`   ${chalk.dim('→')} ${printPath(dir)}`);
        }
        else {
            console.log(printSuccess(` ✓ Mark '${mark}' updated successfully`));
            console.log(`   ${chalk.dim('→')} ${printPath(dir)}`);
        }
    }
    catch (e) {
        console.log(printFail(` ✗ Failed to save mark '${mark}'`));
        console.log(`   ${chalk.dim('Error:')} ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}
async function list_marks() {
    const marks = await listAll();
    if (marks.length === 0) {
        console.log(printInfo(" ℹ No marks found"));
        console.log(`   Create a mark using ${printCode("marker mark <name>")}`);
        return;
    }
    console.log(printInfo(` 📍 Found ${marks.length} mark${marks.length === 1 ? '' : 's'}:`));
    console.log();
    marks.forEach(mark => {
        console.log(`   ${chalk.yellow.bold(mark.mark)} ${chalk.dim('→')} ${printPath(mark.path)}`);
    });
}
async function remove_mark(mark) {
    try {
        let deleted = await deleteMark(mark);
        if (deleted) {
            console.log(printSuccess(` ✓ Deleted mark '${mark}'`));
            console.log(`   ${chalk.dim('Path was:')} ${printPath(deleted)}`);
        }
        else {
            console.log(printInfo(` ℹ Mark '${mark}' does not exist`));
        }
    }
    catch (e) {
        console.log(printFail(` ✗ Failed to delete mark '${mark}'`));
        console.log(`   ${chalk.dim('Error:')} ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}
async function get_mark(mark) {
    try {
        const mark_path = await getMark(mark);
        if (mark_path) {
            console.log(mark_path);
        }
        else {
            console.log(printFail(` ✗ Mark '${mark}' not found`));
            process.exit(1);
        }
    }
    catch (e) {
        console.log(printFail(` ✗ Failed to get mark '${mark}'`));
        console.log(`   ${chalk.dim('Error:')} ${e instanceof Error ? e.message : 'Unknown error'}`);
        process.exit(1);
    }
}
//# sourceMappingURL=marker.js.map
