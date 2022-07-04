
// 0. check if store exists
// 1. create new store
// 2. create details list of the cli
// 3. store the details in the new store
// 4. export details

const Conf = require('conf');

const authorConfigDetails = {
  author_name: 've3Y Gitahi',
  author_email: 'gitahi@example.com',
  author_GitHub_URL: 'https://github.com/Victor-Gitahi',
  author_twitter_URL: 'https://twitter.com/@thee__plug',
};

function configAuthorDetails() {

  const authorDetailsConfigStore = new Conf();

  authorDetailsConfigStore.set(authorConfigDetails);
  return authorDetailsConfigStore;
}

const authorDataStore = configAuthorDetails();

let authorData = {
  author_name: authorDataStore.get('author_name'),
  author_email: authorDataStore.get('author_email'),
  author_GitHub_URL: authorDataStore.get('author_GitHub_URL'),
  author_twitter_URL: authorDataStore.get('author_twitter_URL'),
};

module.exports = {
  authorData
};