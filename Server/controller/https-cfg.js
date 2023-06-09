import https from 'https';

const agent = new https.Agent({ keepAlive:true });
const config = {
    timeout: 3000,
    httpsAgent: agent
};

export default { config };