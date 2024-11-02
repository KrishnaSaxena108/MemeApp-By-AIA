const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your actual contract address
const abi = [
    // Replace with your actual contract ABI
];

let contract;
let signer;
let isConnected = false;

async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            isConnected = true;
            document.getElementById('connectWallet').textContent = 'Connected';
            document.getElementById('connectWallet').disabled = true;
            loadMemes();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            showMessage('Failed to connect wallet: ' + error.message);
        }
    } else {
        showMessage('Please install MetaMask!');
    }
}

async function submitMeme() {
    const memeUrl = document.getElementById('memeUrl').value;
    const memeDescription = document.getElementById('memeDescription').value;

    if (!memeUrl || !memeDescription) {
        showMessage('Please enter both URL and description.');
        return;
    }

    if (!isConnected) {
        showMessage('Please connect your wallet first.');
        return;
    }

    showMessage('Submitting meme...');
    try {
        const tx = await contract.uploadMeme(memeUrl, memeDescription);
        await tx.wait();
        showMessage('Meme submitted successfully!');
        document.getElementById('memeUrl').value = '';
        document.getElementById('memeDescription').value = '';
        loadMemes();
    } catch (error) {
        console.error(error);
        showMessage('Submission failed: ' + error.message);
    }
}

async function loadMemes() {
    if (!isConnected) {
        showMessage('Please connect your wallet to view memes.');
        return;
    }

    const memeList = document.getElementById('memeList');
    memeList.innerHTML = '';

    try {
        const memeCount = await contract.getMemeCount();
        for (let i = 0; i < memeCount; i++) {
            const meme = await contract.getMeme(i);
            const memeCard = createMemeCard(meme, i);
            memeList.appendChild(memeCard);
        }
    } catch (error) {
        console.error('Failed to load memes:', error);
        showMessage('Failed to load memes: ' + error.message);
    }
}

function createMemeCard(meme, index) {
    const card = document.createElement('div');
    card.className = 'meme-card';
    card.innerHTML = `
        <img src="${meme.url}" alt="Meme">
        <div class="meme-card-content">
            <h3>${meme.description}</h3>
            <p>Votes: <span id="voteCount-${index}">${meme.votes}</span></p>
            <div class="vote-buttons">
                <button onclick="voteMeme(${index}, true)" class="vote-btn">Upvote</button>
                <button onclick="voteMeme(${index}, false)" class="vote-btn">Downvote</button>
            </div>
        </div>
    `;
    return card;
}

async function voteMeme(index, isUpvote) {
    if (!isConnected) {
        showMessage('Please connect your wallet first.');
        return;
    }

    try {
        const tx = await contract.voteMeme(index, isUpvote);
        await tx.wait();
        const newVoteCount = await contract.getMemeVotes(index);
        document.getElementById(`voteCount-${index}`).textContent = newVoteCount.toString();
    } catch (error) {
        console.error('Failed to vote:', error);
        showMessage('Failed to vote: ' + error.message);
    }
}

function showMessage(message) {
    document.getElementById('message').textContent = message;
}

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    if (tabName === 'memeGallery' && isConnected) {
        loadMemes();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('submitMemeBtn').addEventListener('click', submitMeme);

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
});