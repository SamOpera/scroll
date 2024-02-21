window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connect-wallet-button');
    const popup = document.getElementById('popup');
    let connectedWalletAddress = '';
    let allocatedTokens = 0;

    connectWalletButton.addEventListener('click', async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Show wallet connection popup
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

            // Update connected wallet address
            connectedWalletAddress = accounts[0];
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            // Handle connection error here
            alert('Failed to connect to wallet. Please make sure MetaMask is installed and unlocked.');
        }
    });

    // Additional functionality for disconnecting wallet (not directly related to reconnection)
    function disconnectWallet() {
        // Hide the popup
        popup.style.display = 'none';

        // Reset connected wallet address
        connectedWalletAddress = '';
    }
});
