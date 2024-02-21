window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connect-wallet-button');
    const popup = document.getElementById('popup');
    let isWalletConnected = false;
    let connectedWalletAddress = '';
    let allocatedTokens = 0;

    const MMSDK = new MetaMaskSDK.MetaMaskSDK({
        dappMetadata: {
            name: "Scroll Airdrop Checker",
            url: window.location.href,
        }
    });

    // Initialize MetaMask SDK
    await MMSDK.init();

    connectWalletButton.addEventListener('click', async () => {
        try {
            const accounts = await MMSDK.requestAccounts();

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
            if (error.code === "MM_USER_DENIED_REQUEST") {
                console.log("User denied the request");
                // Handle user denying the request
            } else {
                console.error("Error connecting to wallet:", error);
            }
        }
    });
});
