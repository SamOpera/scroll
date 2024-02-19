document.addEventListener('DOMContentLoaded', () => {
  const connectWalletButton = document.getElementById('connect-wallet-button');
  const popup = document.getElementById('popup');

  connectWalletButton.addEventListener('click', () => {
    // Replace this with your wallet connection logic
    // For demonstration purposes, just showing a popup message
    popup.innerText = 'Connecting to wallet...';
    setTimeout(() => {
      popup.innerText = 'Wallet connected!';
    }, 2000);
  });
});
