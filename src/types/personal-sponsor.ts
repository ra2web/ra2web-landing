export interface PersonalSponsorRecord {
  id: string;
  name: string;
  deed: string;
  published?: boolean;
}

export interface PersonalSponsorsFile {
  version: number;
  updatedAt: string;
  sponsors: PersonalSponsorRecord[];
}
