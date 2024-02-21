window.addEventListener('load', async () => {
    const walletButton = document.getElementById('wallet-button');
    const popup = document.getElementById('popup');
    let isWalletConnected = false;

    walletButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                if (!isWalletConnected) {
                    // Requesting permission to connect to wallet
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

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
                        walletButton.innerHTML = 'Disconnect Wallet';
                        isWalletConnected = true;
                    }
                } else {
                    // Requesting permission to disconnect from wallet
                    await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
                    popup.innerHTML = '';
                    popup.style.display = 'none';
                    walletButton.innerHTML = 'Connect Wallet';
                    isWalletConnected = false;
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    });
});
