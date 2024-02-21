window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connect-wallet-button');
    const popup = document.getElementById('popup');
    let isWalletConnected = false;
    let connectedWalletAddress = '';
    let allocatedTokens = 0;

    connectWalletButton.addEventListener('click', async () => {
        if (!isWalletConnected) {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                    // this code will check if wallet was connected before and if yes, display the previous allocation
                    if (connectedWalletAddress === accounts[0]) {
                        // Show previous allocation
                        const popupContent = `
                            <div class="popup-content">
                                <h2>Wallet Connected!</h2>
                                <p>Your wallet address: ${connectedWalletAddress}</p>
                                <p>ALLOCATION GIVEN: ${allocatedTokens} SCRL tokens! 😄</p>
                            </div>
                        `;
                        popup.innerHTML = popupContent;
                        popup.style.display = 'block';
                    } else {

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

                        // Update connected wallet address and set wallet connected flag to true
                        connectedWalletAddress = accounts[0];
                        isWalletConnected = true;
                    }

                    // Update button text to indicate wallet connection
                    connectWalletButton.innerHTML = `Disconnect Wallet`;
                } catch (error) {
                    console.error("Error connecting to wallet:", error);
                }
            } else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        } else {
            // Disconnect wallet
            // Perform any necessary cleanup here

            // Hide the popup
            popup.style.display = 'none';

            // Update button text to indicate wallet disconnection
            connectWalletButton.innerHTML = `Connect Wallet`;

            // Reset connected wallet address and set wallet connected flag to false
            connectedWalletAddress = '';
            isWalletConnected = false;
        }
    });
});
