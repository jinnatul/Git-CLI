import myApp from 'commander';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import {
  getCurrentDirectoryBase,
} from './lib/files';
import {
  githubAuth,
  getStoredGithubToken,
  setGithubCredentials,
  registerNewToken,
} from './lib/githubCredentials';
import {

} from './lib/inquirer';
import {
  createRemoteRepository,
  createGitIgnore,
  setupRepository,
} from './lib/createRepo';

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

myApp
  .command('create_repo')
  .description('Create a new repository on Github') 
  .action(async () => {
    const getGithubToken = async () => {
      let token = getStoredGithubToken();
      if (token) {
        return token;
      }
      await setGithubCredentials();
      token = await registerNewToken();
      return token;
    }

    try {
      const token = await getGithubToken();
      githubAuth(token);

      const url = await createRemoteRepository();
      await createGitIgnore();

      const complete = await setupRepository(url);
      if (complete) {
        console.log(chalk.green('All done!'));
      }
    } catch (error) {
      switch (error.status) {
        case 401:
          console.log(chalk.red('Could\'t log you in. Please provide correct credentials or token.'));
          break;
        case 422:
          console.log(chalk.red('There already exists a remote repository with the same name.'));
          break;
        default:
          console.log(error);
          break;
      }
    }
  }) 

myApp.parse(process.argv);

if (!myApp.args.length) {
  myApp.help();
}