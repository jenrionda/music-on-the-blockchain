![Company logo](images/logo.png)


# Musician Ballot (MB)
* MB is a decentralized application built on the ethereum blockchain that allows users to vote on their favorite musican from a pre-selected list of musicians. The voting transaction is registered on the blockchain using the Rinkeby testnet network and MetaMask wallet. 

* Some of the benefits of Musician Ballot is that it provides a secure method to capture votes with broad application (e.g., electoral voting), connected to a simple and intuitive user interface.

![User interface](images/music-on-the-blockchain.png)

## Contributors
* Roland Ferrao
* Armen Arsenyan
* Jennifer Rionda

## How it works
1. Musician Ballot runs on the Rinkeby network, in order to cast a vote you must have Ether (Note, voting transactions typically require anywhere between 0.6-1.0 Ether)
2. If you do not have Ether, you can easily obtain it from the test faucet (Note, requests are tied to common 3rd party social network accounts. Anyone having a Twitter or Facebook account may request funds within the permitted limits) https://faucet.rinkeby.io/
3. Once you have Ether in your wallet, you can access the Musician Ballot app via https://musicians-ballot-app.netlify.com/
4. Review the pre-selected list of best musicians of all time and cast your vote. (Note, that you can only vote once)
5. If you're vote is completed successfully, you will see the number of votes for your selected artist increase by one 


## Technologies used
1. Java/CSS/HTML (UI)
2. Metamask (Wallet)
3. Ethereum (Blockchain)
4. Truffle (Development Environment)
5. Solidity (Contract Language)
6. Rinkeby (Network)


## Requirements and Configuration
* Define the method of contract Election
* Model a Candidate
* Store accounts that have voted
* Store candidates count, once votes are completed
* Update candidate vote count
* Trigger voted event

## Challenges Encountered
* Reference resources engineered their solution on Solidity 5.0, whereas the team's expertise is in Solidity 4.0
* There was an additional learning curve for the Truffle Suite, which allows you to develop locally. The team's expertise is in Remix


## Resources
* https://github.com/maheshmurthy/ethereum_voting_dapp
* https://github.com/dappuniversity/election
* https://github.com/dibakarsutradhar/election
* https://github.com/Vote-On-Ethereum/Contract
* https://gist.github.com/maheshmurthy/3da385a42678c3e36a8328cbe47cae5b
* https://builtin.com/blockchain/blockchain-music-innovation-examples
* https://medium.com/coinmonks/voting-on-a-blockchain-solidity-contract-codes-explained-c677996d94f2
* https://www.imdb.com/list/ls059445864/
* https://solidity.readthedocs.io/en/v0.6.2/solidity-by-example.html
* https://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial

