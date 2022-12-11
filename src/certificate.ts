import * as crypto from 'crypto';
import * as fs from 'fs';

const key = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'password'
    }
  });
  
  fs.writeFileSync('server.key', key.privateKey);
  
  const cert = crypto.createCertificate({
    commonName: 'example.com',
    organizationName: 'Example, Inc.',
    organizationUnitName: 'Operations',
    validity: {
      notBefore: '2020-01-01T00:00:00Z',
      notAfter: '2030-01-01T00:00:00Z'
    },
    signingAlgorithm: 'sha256WithRSAEncryption'
  });
  
  cert.sign(key.privateKey);
  
  fs.writeFileSync('server.cert', cert.export({ type: 'pem' }));
  