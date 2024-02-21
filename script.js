window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connect-wallet-button');
    const disconnectWalletButton = document.getElementById('disconnect-wallet-button');
    const popup = document.getElementById('popup');

    connectWalletButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Display wallet connection details
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    const minTokens = 1500;
                    const maxTokens = 100000;
                    const allocatedTokens = Math.floor(Math.random() * (maxTokens - minTokens + 1)) + minTokens;

                    const popupContent = `
                        <div class="popup-content">
                            <h2>Wallet Connected!</h2>
                            <p>Your wallet address: ${accounts[0]}</p>
                            <p>ALLOCATION GIVEN: ${allocatedTokens} SCRL tokens! 😄</p>
                        </div>
                    `;
                    popup.innerHTML = popupContent;
                    popup.style.display = 'block';
                }
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    });

    disconnectWalletButton.addEventListener('click', async () => {
        if (window.ethereum && window.ethereum.isConnected()) {
            try {
                await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
            } catch (error) {
                console.error("Error disconnecting wallet:", error);
            }
        }
    });
});
