export type UUID = string;

export type ItemSettings = {
  hasThumbnail?: boolean;
};

export type Item = {
  id: UUID;
  name: string;
  path: string;
  type: string;
  description: string;
  extra: unknown;
  settings?: ItemSettings;
  createdAt: string;
  updatedAt: string;
  creator: string;
};

export type ItemMembership = {
  id: UUID;
  memberId: string;
  itemPath: string;
  permission: string;
  createdAt: string;
  updatedAt: string;
  creator: string;
};

export type MemberExtra = {
  hasAvatar?: boolean;
  password?: string;
};

export type Member = {
  id: UUID;
  name: string;
  email: string;
  extra: MemberExtra;
  createdAt: string;
  updatedAt: string;
};
