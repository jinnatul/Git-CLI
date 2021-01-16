/*
 * Get the name of the current directory
 * Check if the current directory is already a Git repo
 */

 import fs from 'fs';
 import path from 'path';

 export const getCurrentDirectoryBase = () => {
   return path.basename(process.cwd());
 }

 export const directoryExists = (filePath) => {
   try {
     return fs.statSync(filePath).isDirectory();
   } catch (error) {
     return false;
   }
 }

 export const isGitRepository = () => {
   if (files.directoryExists('.git')) {
     console.log(chalk.red('Sorry! Can\'t create a new git repo because this directory is already inside a git repository'));
     process.exit();
   }
 }