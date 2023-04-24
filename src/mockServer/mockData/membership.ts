import { ItemMembership, PermissionLevel } from '@graasp/sdk';

const MOCK_MEMBERSHIP: ItemMembership[] = [
  {
    id: 'membership1',
    memberId: 'user1',
    itemPath: '1111_kkkk.1234_kkkk',
    permission: PermissionLevel.Admin,
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
    creator: 'user2',
  },
];

export default MOCK_MEMBERSHIP;
