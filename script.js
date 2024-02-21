window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connect-wallet-button');
    const popup = document.getElementById('popup');
    let isWalletConnected = false;
    let connectedWalletAddress = '';
    let allocatedTokens = 0;

    connectWalletButton.addEventListener('click', async () => {
        if (!isWalletConnected) {
            try {
                let accounts;

                // Check if MetaMask is installed
                if (window.ethereum) {
                    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                } else {
                    // Check if Trust Wallet is installed
                    if (window.ethereum?.isTrust) {
                        // Create a connector for Trust Wallet
                        const connector = new WalletConnect({
                            bridge: "https://bridge.walletconnect.org",
                            qrcodeModal: QRCodeModal,
                        });

                        // Check if connection is already established
                        if (!connector.connected) {
                            // create new session
                            connector.createSession();
                        }

                        // Subscribe to connection events
                        connector.on("connect", (error, payload) => {
                            if (error) {
                                throw error;
                            }
                            // Get provided accounts and chainId
                            const { accounts, chainId } = payload.params[0];
                        });

                        connector.on("session_update", (error, payload) => {
                            if (error) {
                                throw error;
                            }
                            // Get updated accounts and chainId
                            const { accounts, chainId } = payload.params[0];
                        });

                        connector.on("disconnect", (error, payload) => {
                            if (error) {
                                throw error;
                            }
                            // Delete connector
                        });

                        // Prompt the user to connect with Trust Wallet
                        // For demonstration, you can use QRCodeModal to display the QR code
                        QRCodeModal.open(connector.uri);
                    } else {
                        throw new Error('No Ethereum provider detected. Please install an EVM-compatible wallet.');
                    }
                }

                // Generate random tokens for demonstration
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

                // Update button text to indicate wallet connection
                connectWalletButton.innerHTML = `Disconnect Wallet`;
            } catch (error) {
                console.error("Error connecting to wallet:", error);
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
