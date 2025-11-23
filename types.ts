export interface PunkAttributes {
  skin: string;
  eyes: string;
  mouth: string;
  accessory: string;
  hair: string;
}

export interface PunkData {
  id: number;
  image: string; // Data URL
  attributes: PunkAttributes;
  bio: string;
  isLoadingBio: boolean;
  ipfsHash?: string;
}

export enum MintStatus {
  IDLE = 'IDLE',
  MINTING = 'MINTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}