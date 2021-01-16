/**
 * Input type
 * Password type
 * Add to the inquirer.js file in the lib directory
 */

import inquirer from 'inquirer';
import minimist from 'minimist';
import {
  getCurrentDirectoryBase,
} from './files';

export const askGithubCredentials = () => {
  const questions = [{
      name: 'username',
      type: 'input',
      message: 'Enter your Github username or e-mail address: ',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your Github username or e-mail address';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password: ',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password: ';
        }
      }
    },

  ];
  return inquirer.prompt(questions);
}

export const askRepositoryDetails = () => {
  const args = minimist(process.argv.slice(2));

  const questions = [{
      type: 'input',
      name: 'name',
      message: 'Please enter a name for your repository: ',
      default: argv._[0] || getCurrentDirectoryBase(),
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a unique name for the repository.';
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      default: argv._[1] || null,
      message: 'You can choose a description for your repository (it\'s not mendatory): ',
    },
    {
      type: 'input',
      name: 'visibility',
      default: argv._[1] || null,
      message: 'Would you like this repository to be set as public or private ?: ',
      choices: ['public', 'private'],
      default: 'public',
    }
  ];
  return inquirer.prompt(questions);
}

export const askIgnoreFiles = (fileList) => {
  const questions = [
    {
      type: 'checkbox',
      name: 'ignore',
      message: 'Select the file and/or folders you wish to ignore: ',
      choices: fileList,
      default: ['node_modules'],
    }
  ];
  return inquirer.prompt(questions);
}