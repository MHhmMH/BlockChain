const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index,timestamp,data,previoushash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previoushash = previoushash;
    this.hash = this.calculateHash();
  }
    calculateHash(){
    return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString();
  }
    setHash (hash){
      this.hash =  hash
    }
}
class BlockChain {
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(0,"07/01/2019","Genesis Block","Dummy Head");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock){
    newBlock.previoushash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  isValidChain()
  {
    for (let i = 1; i < this.chain.length;i ++ ){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash!= currentBlock.calculateHash()) {
        return false
      }
      if (currentBlock.previoushash!= previousBlock.hash){
        return false
      }
    }
    return true
  }
}
let minghaoBlockChain  = new BlockChain();
minghaoBlockChain.addBlock(new Block(1,"07/02/2019", {amount: 4}));
minghaoBlockChain.addBlock(new Block(2,"07/03/2019", {amount: 8}));
console.log(JSON.stringify(minghaoBlockChain,null,4));
console.log("Is This a valid chain" + " "  + minghaoBlockChain.isValidChain());
minghaoBlockChain.chain[1].data = {amount:1000};
console.log("Is This a valid chain" + " "  + minghaoBlockChain.isValidChain());
