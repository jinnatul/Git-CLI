import myApp from 'commander';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import {
  getCurrentDirectoryBase,
} from './lib/files';
import {
  getStoredGithubToken,
  setGithubCredentials,
  registerNewToken,
} from './lib/githubCredentials';

myApp
  .command('init')
  .description('Init Morol CLI')
  .action(() => {
    clear();
    console.log(chalk.green(figlet.textSync('Morol CLI', {
      horizontalLayout: 'full'
    })));
  });

myApp
  .command('github')
  .description('Check user Github credentials')
  .action(async () => {
    let token = getStoredGithubToken();
    if (!token) {
      await setGithubCredentials();
      token = await registerNewToken();
    }
  });

myApp.parse(process.argv);

if (!myApp.args.length) {
  myApp.help();
}