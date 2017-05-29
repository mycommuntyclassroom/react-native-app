import config from '../fixtures/firebase';
const root = `https://us-central1-${config.projectId}.cloudfunctions.net`;
const endpoint = method => `${root}/${method}`;
export default endpoint;
