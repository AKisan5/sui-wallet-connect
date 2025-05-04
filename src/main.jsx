import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mysten/dapp-kit/dist/index.css';
import SuiWalletConnect from '../SuiWalletConnect';

// 方法1: Reactコンポーネントとして使用
const reactRoot = ReactDOM.createRoot(document.getElementById('react-component-demo'));
reactRoot.render(
  <React.StrictMode>
    <SuiWalletConnect />
  </React.StrictMode>
);

// 方法2: DOM要素に直接描画
setTimeout(() => {
  new SuiWalletConnect({
    targetElement: 'wallet-connect-container',
    network: 'mainnet'
  });
}, 500);
