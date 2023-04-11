import { Member } from '../types';

const MOCK_MEMBERS: Member[] = [
  {
    id: 'user1',
    email: 'mock-email',
    name: 'mock-name',
    extra: {},
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
  },
  {
    id: 'user2',
    email: 'mock-email',
    name: 'mock-name',
    extra: {},
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
  },
];

export default MOCK_MEMBERS;
