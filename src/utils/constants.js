let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'prod') {
  apiRoot = 'https://trello-api-az75.onrender.com'
}
export const API_ROOT = apiRoot