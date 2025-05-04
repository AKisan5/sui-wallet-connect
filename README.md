# SUI ウォレットコネクト

SUI ブロックチェーンのウォレット接続機能を提供するReactコンポーネントです。

## 機能

- SUIウォレットとの簡単な接続
- 接続状態の表示
- ウォレットアドレスの表示
- Sui Wallet Standardに準拠した全てのウォレットの自動検出

## インストール

```bash
npm install @mysten/dapp-kit @mysten/sui @tanstack/react-query react react-dom
```

## 使用方法

### 方法1: HTMLに直接組み込む（非Reactプロジェクト）

1. HTMLファイルにコンテナ要素を追加します：

```html
<div id="wallet-connect-container"></div>
```

2. JavaScriptファイルでウォレットコネクトを初期化します：

```javascript
import SuiWalletConnect from './SuiWalletConnect.jsx';

// DOM要素に描画
new SuiWalletConnect({
  targetElement: 'wallet-connect-container', // ID名または直接DOM要素を指定
  network: 'mainnet' // または 'testnet'
});
```

### 方法2: Reactコンポーネントとして使用（Reactプロジェクト）

```jsx
import React from 'react';
import SuiWalletConnect from './SuiWalletConnect.jsx';

function App() {
  return (
    <div>
      <h1>マイアプリ</h1>
      <SuiWalletConnect />
    </div>
  );
}
```

## オプション

`SuiWalletConnect` コンポーネントは以下のプロパティを受け取ります：

- `targetElement`: 描画先の要素ID名または直接DOM要素（非Reactプロジェクト用）
- `network`: 接続するネットワーク（'mainnet'または'testnet'、デフォルトは'mainnet'）
- `className`: 適用するCSSクラス名（Reactプロジェクト用）

## 必要条件

- ブラウザにSui Wallet Standardに準拠したウォレット拡張機能がインストールされていること
  - [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)
  - [Ethos Wallet](https://chrome.google.com/webstore/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli)
  - [Suiet Wallet](https://chrome.google.com/webstore/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd)

## 開発者向け

### 開発環境のセットアップ

```bash
git clone https://github.com/AKisan5/sui-wallet-connect.git
cd sui-wallet-connect
npm install
npm run dev
```

## ライセンス

MIT
