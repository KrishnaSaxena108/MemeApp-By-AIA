# Meme Submission DApp

This decentralized application (DApp) allows users to submit and vote on memes. Built with Solidity for the smart contract backend and HTML, CSS, and JavaScript for the frontend, this DApp connects to the blockchain using MetaMask and ethers.js.

## Features

- Submit a meme by entering a URL and description
- Interact with the Ethereum-based smart contract on the blockchain
- Connect wallet via MetaMask to send transactions

## Tech Stack

- **Solidity**: Smart contract development
- **Ethers.js**: Blockchain interaction via JavaScript
- **MetaMask**: Wallet connection for transactions
- **HTML/CSS/JavaScript**: Frontend

## Prerequisites

- **MetaMask**: Install MetaMask to connect to the Ethereum blockchain.
- **Node.js and npm** (for local development, optional): Download and install [Node.js](https://nodejs.org/).

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/MemeSubmissionDApp.git
cd MemeSubmissionDApp
```

### Deploy the Smart Contract

#### Compile and Deploy on Remix:
1. Open [Remix IDE](https://remix.ethereum.org/)
2. Copy the contents of `MemeApp.sol` into a new file in Remix
3. Compile the contract and deploy it on a testnet (e.g., AIA testnet)
4. Copy the deployed contract address

#### Retrieve ABI:
1. After deploying, copy the ABI from the Remix compilation details

### Update Frontend Code

1. Open `index.html`
2. Replace `YOUR_CONTRACT_ADDRESS` in the JavaScript section with the deployed contract address
3. Replace `abi` in the JavaScript section with the actual ABI

### Start the Frontend

Open `index.html` in your browser to interact with the DApp.

## Usage

### Connect MetaMask
- Ensure MetaMask is connected to the same network where the contract is deployed

### Submit a Meme
1. Enter a meme URL and description
2. Click "Submit Meme"

### Check for Transaction Confirmation
1. MetaMask will prompt you to confirm the transaction
2. Once confirmed, the meme will be added to the blockchain

## File Structure

```plaintext
.
├── index.html            # Main HTML file for the DApp, including internal CSS and JavaScript
├── MemeApp.sol           # Solidity contract for meme submission
└── README.md             # Project documentation
```

## Security

### Keep Private Keys Secure
- Never expose private keys in your codebase
- Use environment variables or secure vaults if needed for local testing

### Contract Address and ABI
The contract address and ABI are safe to share in a public repository as they enable users to interact with the contract.

## License

This project is licensed under the MIT License.

## Contributing

Feel free to open issues or submit pull requests for improvements!