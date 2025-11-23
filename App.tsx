import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MintSection from './components/MintSection';
import PunkGallery from './components/PunkGallery';
import { MintStatus, PunkData } from './types';
import { generatePunk } from './utils/punkGen';
import { generatePunkBio } from './services/gemini';
import { uploadToIPFS } from './services/ipfs';

// Add type definition for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [mintStatus, setMintStatus] = useState<MintStatus>(MintStatus.IDLE);
  const [mintedPunks, setMintedPunks] = useState<PunkData[]>([]);
  const [totalMinted, setTotalMinted] = useState<number>(420); // Starting fake number

  // Initialize Wallet Listeners
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        })
        .catch((err: any) => console.error("Error checking accounts:", err));

      // Handle account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  // Connect Wallet Logic
  const handleConnectWallet = useCallback(async () => {
    if (walletAddress) {
      // Allow user to "disconnect" from the UI state, though MetaMask remains connected
      setWalletAddress(null);
      return;
    }

    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error: any) {
        if (error.code === 4001) {
          // User rejected request
          console.log("User rejected connection request");
        } else {
          console.error("Error connecting wallet:", error);
        }
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
      window.open('https://metamask.io/download/', '_blank');
    }
  }, [walletAddress]);

  // Minting Logic
  const handleMint = useCallback(async (amount: number) => {
    setMintStatus(MintStatus.MINTING);

    try {
      // Create promises for generating and uploading each punk
      // We do this concurrently to save time
      const punkPromises = Array.from({ length: amount }).map(async (_, i) => {
        const id = totalMinted + i + 1;
        const { image, attributes } = generatePunk(id);
        
        // Upload image to IPFS
        const ipfsHash = await uploadToIPFS(image);

        return {
          id,
          image,
          attributes,
          bio: '',
          isLoadingBio: true,
          ipfsHash
        } as PunkData;
      });

      const newPunks = await Promise.all(punkPromises);

      // Update State immediately with loading bios
      setTotalMinted(prev => prev + amount);
      setMintedPunks(prev => [...newPunks, ...prev]);
      setMintStatus(MintStatus.SUCCESS);

      // Fetch Bios from Gemini (in background)
      newPunks.forEach(async (punk) => {
        const bio = await generatePunkBio(punk.id, punk.attributes);
        
        setMintedPunks(currentPunks => 
          currentPunks.map(p => 
            p.id === punk.id 
              ? { ...p, bio, isLoadingBio: false } 
              : p
          )
        );
      });

      // Reset status after a delay
      setTimeout(() => setMintStatus(MintStatus.IDLE), 3000);

    } catch (error) {
      console.error("Minting error:", error);
      setMintStatus(MintStatus.ERROR);
      // Reset status after error
      setTimeout(() => setMintStatus(MintStatus.IDLE), 3000);
    }

  }, [totalMinted]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar walletAddress={walletAddress} onConnect={handleConnectWallet} />
      
      <main className="flex-grow">
        <Hero />
        <MintSection 
          onMint={handleMint} 
          status={mintStatus} 
          mintedCount={totalMinted} 
          walletConnected={!!walletAddress}
        />
        <PunkGallery punks={mintedPunks} />
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p className="font-mono">© 2024 CyberPunk 10K. All rights reserved.</p>
        <p className="mt-2 text-xs">Powered by Gemini AI • React • Tailwind • IPFS</p>
      </footer>
    </div>
  );
};

export default App;