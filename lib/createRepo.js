import _ from 'lodash';
import fs from 'fs';
import simpleGit from 'simple-git';
import {
  getInstance
} from './githubCredentials';
import {
  askRepositoryDetails,
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