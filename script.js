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

          if (connectedWalletAddress === accounts[0]) {
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

            connectedWalletAddress = accounts[0];
            isWalletConnected = true;
          }

          connectWalletButton.innerHTML = `Disconnect Wallet`;
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        // Provide instructions based on the device type
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        let alertMessage = 'MetaMask extension not detected. ';
        if (isMobile) {
          alertMessage += 'Please make sure you have installed the MetaMask mobile app and try again.';
        } else {
          alertMessage += 'You should consider trying MetaMask!';
        }
        console.log(alertMessage);
        alert(alertMessage);
      }
    } else {
      popup.style.display = 'none';
      connectWalletButton.innerHTML = `Connect Wallet`;
      connectedWalletAddress = '';
      isWalletConnected = false;
    }
  });
});
