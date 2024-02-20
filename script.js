window.addEventListener('load', async () => {
  const connectWalletButton = document.getElementById('connect-wallet-button');
  const popup = document.getElementById('popup');
  let isWalletConnected = false;
  let connectedWalletAddress = '';
  let allocatedTokens = 0;

  connectWalletButton.addEventListener('click', async () => {
    try {
      if (!isWalletConnected) {
        if (window.ethereum) {
          // Requesting accounts from MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Check if the user denied permission
          if (accounts.length === 0) {
            throw new Error('User denied account access');
          }

          // Displaying wallet connection details
          const walletAddress = accounts[0];
          displayWalletConnection(walletAddress);
        } else {
          throw new Error('MetaMask extension not detected');
        }
      } else {
        // Disconnect wallet
        disconnectWallet();
      }
    } catch (error) {
      handleWalletError(error);
    }
  });

  function displayWalletConnection(walletAddress) {
    // Displaying wallet connection details in the popup
    const minTokens = 1500;
    const maxTokens = 100000;
    allocatedTokens = Math.floor(Math.random() * (maxTokens - minTokens + 1)) + minTokens;

    const popupContent = `
      <div class="popup-content">
        <h2>Wallet Connected!</h2>
        <p>Your wallet address: ${walletAddress}</p>
        <p>ALLOCATION GIVEN: ${allocatedTokens} SCRL tokens! 😄</p>
      </div>
    `;
    popup.innerHTML = popupContent;
    popup.style.display = 'block';

    // Update connected wallet address and set wallet connected flag to true
    connectedWalletAddress = walletAddress;
    isWalletConnected = true;

    // Update button text to indicate wallet connection
    connectWalletButton.innerHTML = `Disconnect Wallet`;
  }

  function disconnectWallet() {
    // Hide the popup
    popup.style.display = 'none';

    // Update button text to indicate wallet disconnection
    connectWalletButton.innerHTML = `Connect Wallet`;

    // Reset connected wallet address and set wallet connected flag to false
    connectedWalletAddress = '';
    isWalletConnected = false;
  }

  function handleWalletError(error) {
    console.error('Error connecting to wallet:', error);

    // Provide user-friendly error message
    let errorMessage = 'An error occurred while connecting to the wallet.';

    // Check if the error is due to user denying permission
    if (error.message.includes('User denied account access')) {
      errorMessage = 'Access to your wallet was denied. Please grant permission to connect your wallet.';
    }

    // Display error message to the user
    alert(errorMessage);
  }
});
