document.addEventListener('DOMContentLoaded', () => {
  const connectWalletButton = document.getElementById('connect-wallet-button');
  const popup = document.getElementById('popup');

  connectWalletButton.addEventListener('click', () => {
    popup.innerText = 'Connecting to wallet...';
    setTimeout(() => {
      popup.innerText = 'Wallet connected!';
    }, 2000);
  });
});
