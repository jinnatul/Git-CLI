import {
  Octokit
} from '@octokit/rest';
import Configstore from 'configstore';
import _ from 'lodash';
import pkg from '../package.json';
import {
  askGithubCredentials,
} from './inquirer';

const conf = new Configstore(pkg.name);

export const getInstance = () => {
  return Octokit;
}

export const githubAuth = (token) => {
  Octokit.authenticate({
    type: 'oauth',
    token: token,
  });
}

export const getStoredGithubToken = () => {
  return conf.get('github_credentials.token');
}

export const setGithubCredentials = async () => {
  const credentials = await askGithubCredentials();
  Octokit.authenticate(
    _.extend({
      type: 'basic',
    }, credentials),
  );
}

export const registerNewToken = async () => {
  try {
    const response = await Octokit.oauthAuthorization.createAuthorization({
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: 'Git-CLI: a cool tool for dev workflow automation'
    });

    const token = response.data.token;
    if (token) {
      conf.set('github_credentials.token', token);
      return token;
    } else {
      throw new Error('Mission Token', 'Uh oh. A Github token was not retrieved.');
    }
  } catch (error) {
    throw error;
  }
}