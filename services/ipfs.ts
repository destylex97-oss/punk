
const PINATA_JWT = process.env.PINATA_JWT;

export const uploadToIPFS = async (dataUrl: string): Promise<string> => {
  try {
    // 1. Convert Data URL to Blob
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    
    // 2. Upload to Pinata if key exists
    if (PINATA_JWT) {
      const formData = new FormData();
      formData.append('file', blob, 'punk.png');

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Pinata upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return `ipfs://${data.IpfsHash}`;
    } 
    
    // 3. Fallback / Simulation Mode
    // If no API key is provided, we simulate the network delay and return a mock hash
    // so the app remains functional for demo purposes.
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockHash = "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return `ipfs://${mockHash}`;

  } catch (error) {
    console.warn("IPFS upload failed or simulated.", error);
    return "ipfs://UploadFailed";
  }
};
