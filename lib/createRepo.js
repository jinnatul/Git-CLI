import _ from 'lodash';
import fs from 'fs';
import touch from 'touch';
import simpleGit from 'simple-git';
import {
  getInstance
} from './githubCredentials';
import {
  askRepositoryDetails,
  askIgnoreFiles,
} from './inquirer';

const git = simpleGit();

export const createRemoteRepository = async () => {
  const github = getInstance();
  const answers = await askRepositoryDetails();

  const data = {
    name: answers.name,
    description: answers.description,
    private: (answers.visibility === 'private'),
  };

  try {
    const response = await github.repos.createForAuthenticatedUser(data);
    return response.data.ssh_url;
  } catch (error) {
    throw error;
  }
}

export const createGitIgnore = async () => {
  const fileList = _.without(fs.readdirSync('.'), '.git', '.gitignore');
  if (fileList.length) {
    const answers = await askIgnoreFiles(fileList);
    if (answers.ignore.length) {
      fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
    } else {
      touch('.gitignore');
    }
  } else {
    touch('.gitignore');
  }
}