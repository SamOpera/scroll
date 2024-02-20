window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connect-wallet-button');
    const popup = document.getElementById('popup');
    let isWalletConnected = false;
    let connectedWalletAddress = '';
    let allocatedTokens = 0;

    connectWalletButton.addEventListener('click', async () => {
        if (!isWalletConnected) {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                
                // MetaMask is successfully connected
                const minTokens = 1500;
                const maxTokens = 100000;
                allocatedTokens = Math.floor(Math.random() * (maxTokens - minTokens + 1)) + minTokens;

                const popupContent = `
                    <div class="popup-content">
                        <h2>Wallet Connected!</h2>
                        <p>Your wallet address: ${accounts[0]}</p>
                        <p>ALLOCATION GIVEN: ${allocatedTokens} SCRL tokens! 😄</p>
                    </div>
                `;
                popup.innerHTML = popupContent;
                popup.style.display = 'block';

                connectedWalletAddress = accounts[0];
                isWalletConnected = true;

                connectWalletButton.innerHTML = `Disconnect Wallet`;
            } catch (error) {
                console.error("Error connecting to wallet:", error);
                if (error.code === 4001) {
                    // User denied account access
                    alert('Please approve the account access request in MetaMask to continue.');
                } else {
                    // Other errors
                    alert('An error occurred while connecting to MetaMask. Please make sure MetaMask is installed and unlocked.');
                }
            }
        } else {
            // Disconnect wallet
            popup.style.display = 'none';
            connectWalletButton.innerHTML = `Connect Wallet`;
            connectedWalletAddress = '';
            isWalletConnected = false;
        }
    });

    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not detected. Please make sure you have MetaMask installed and try again.');
    }
});
