/**
 * Input type
 * Password type
 * Add to the inquirer.js file in the lib directory
 */

 import inquirer from 'inquirer';
 import minimist from 'minimist';
 import files from './files';

 export const askGithubCredentials = () => {
   const questions = [
     {
        name: 'username',
        type: 'input',
        message: 'Enter your Github username or e-mail address: ',
        validate: function(value) {
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
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password: ';
          }
        }
     }
   ];
   return inquirer.prompt(questions);
 }