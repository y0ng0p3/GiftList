const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const myName = 'y0ng0p3';
  const tree = new MerkleTree(niceList);
  const myNameIndex = niceList.findIndex(n => n === myName);
  const proof = tree.getProof(myNameIndex);
  console.log({ myName, proof });

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: myName,
    proof
  });

  console.log({ gift });
}

main();
