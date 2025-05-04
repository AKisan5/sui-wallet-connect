// SuiWalletConnect.jsx
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  createNetworkConfig, 
  SuiClientProvider, 
  WalletProvider,
  ConnectButton,
  useCurrentAccount,
  useWallet
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ========== スタイル定義 ==========
const styles = {
  container: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    marginBottom: '10px',
  },
  description: {
    color: '#666',
    marginBottom: '20px',
  },
  connectSection: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  statusSection: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  walletInfo: {
    padding: '10px 0',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    alignItems: 'center',
  },
  address: {
    fontFamily: 'monospace',
    wordBreak: 'break-all',
    backgroundColor: '#f0f0f0',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.9em',
  },
  walletList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    margin: '20px 0',
  },
  walletItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '8px',
    transition: 'transform 0.2s',
  },
  walletIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '8px',
  },
  suiIcon: {
    backgroundColor: '#e6f7f5',
    color: '#00bfb3',
  },
  ethosIcon: {
    backgroundColor: '#e6eeff',
    color: '#4a7bff',
  },
  statusMessage: {
    color: '#888',
    textAlign: 'center',
    padding: '10px',
  },
  note: {
    fontSize: '0.8em',
    color: '#888',
    marginTop: '10px',
  },
  supportedWallets: {
    backgroundColor: 'white',
    padding: '15px', 
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #eee',
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
  },
  statusDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  connected: {
    backgroundColor: '#4caf50',
  },
  disconnected: {
    backgroundColor: '#ff9800',
  },
  accountInfo: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px',
  },
};

// ========== ウォレット接続状態表示コンポーネント ==========
function WalletStatus() {
  const account = useCurrentAccount();
  const { connected, connecting, wallet } = useWallet();
  
  if (!account) {
    return <div style={styles.statusMessage}>ウォレット未接続</div>;
  }
  
  return (
    <div style={styles.walletInfo}>
      <h3 style={styles.title}>接続済みウォレット</h3>
      
      <div style={styles.statusItem}>
        <div style={styles.statusIndicator}>
          <div style={{ ...styles.statusDot, ...(connected ? styles.connected : styles.disconnected) }}></div>
          <span>接続状態</span>
        </div>
        <span>{connecting ? '接続中...' : (connected ? '接続済み' : '未接続')}</span>
      </div>
      
      <div style={styles.statusItem}>
        <div style={styles.statusIndicator}>
          <div style={{ ...styles.statusDot, ...(wallet ? styles.connected : styles.disconnected) }}></div>
          <span>ウォレット</span>
        </div>
        <span>{wallet ? wallet.name : '未検出'}</span>
      </div>
      
      <div style={styles.statusItem}>
        <div style={styles.statusIndicator}>
          <div style={{ ...styles.statusDot, ...(account ? styles.connected : styles.disconnected) }}></div>
          <span>アカウント</span>
        </div>
        <span>{account ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : '未検出'}</span>
      </div>
      
      {account && (
        <div style={styles.accountInfo}>
          <div>アドレス:</div>
          <div style={styles.address}>{account.address}</div>
        </div>
      )}
    </div>
  );
}

// ========== メインのウォレットコネクトコンポーネント ==========
function WalletConnectApp() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>SUIブロックチェーンウォレット接続</h2>
      <p style={styles.description}>SUIブロックチェーンのウォレットを接続して、接続状態を確認します</p>
      
      <div style={styles.connectSection}>
        <ConnectButton />
      </div>
      
      <div style={styles.statusSection}>
        <h2 style={styles.title}>接続ステータス</h2>
        <WalletStatus />
      </div>
      
      <div style={styles.supportedWallets}>
        <h2 style={styles.title}>対応ウォレット</h2>
        <div style={styles.walletList}>
          <div style={styles.walletItem}>
            <div style={{...styles.walletIcon, ...styles.suiIcon}}>S</div>
            <span>Sui Wallet</span>
          </div>
          <div style={styles.walletItem}>
            <div style={{...styles.walletIcon, ...styles.ethosIcon}}>E</div>
            <span>Ethos</span>
          </div>
        </div>
        <p style={styles.note}>※Sui Wallet Standardに準拠した全てのウォレットが自動的に検出されます</p>
      </div>
    </div>
  );
}

// ========== アプリケーションのルートコンポーネント ==========
export default function SuiWalletConnect({ targetElement, network = 'mainnet', className }) {
  const [initialized, setInitialized] = useState(false);
  
  // React DOMを初期化して描画
  useEffect(() => {
    if (!targetElement || initialized) return;
    
    const container = typeof targetElement === 'string' 
      ? document.getElementById(targetElement) 
      : targetElement;
      
    if (!container) {
      console.error('ターゲット要素が見つかりません:', targetElement);
      return;
    }
    
    // React Query クライアント作成
    const queryClient = new QueryClient();
    
    // ネットワーク設定
    const { networkConfig } = createNetworkConfig({
      mainnet: { url: getFullnodeUrl('mainnet') },
      testnet: { url: getFullnodeUrl('testnet') },
    });
    
    // Reactコンポーネントをレンダリング
    const root = createRoot(container);
    root.render(
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork={network}>
          <WalletProvider>
            <WalletConnectApp />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    );
    
    setInitialized(true);
    
    // クリーンアップ関数
    return () => {
      root.unmount();
    };
  }, [targetElement, network, initialized]);
  
  // 直接描画する場合のフォールバック
  if (!targetElement) {
    // React Query クライアント作成
    const queryClient = new QueryClient();
    
    // ネットワーク設定
    const { networkConfig } = createNetworkConfig({
      mainnet: { url: getFullnodeUrl('mainnet') },
      testnet: { url: getFullnodeUrl('testnet') },
    });
    
    return (
      <div className={className}>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork={network}>
            <WalletProvider>
              <WalletConnectApp />
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </div>
    );
  }
  
  // 外部要素に描画する場合はnullを返す
  return null;
}