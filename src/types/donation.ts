export type DonationCurrency = 'btc' | 'eth' | 'doge' | 'bmc' | 'other';
export type DonationChannel = 'crypto' | 'bmc' | 'other';

export interface DonationRecord {
  id: string;
  displayName: string;
  anonymous?: boolean;
  amount?: string;
  currency?: DonationCurrency;
  channel: DonationChannel;
  donatedAt: string;
  message?: string;
  txUrl?: string;
  published?: boolean;
}

export interface DonationsFile {
  version: number;
  updatedAt: string;
  donations: DonationRecord[];
}
