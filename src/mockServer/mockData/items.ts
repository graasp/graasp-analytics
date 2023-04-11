import { Item } from '../types';

const MOCK_ITEMS: Item[] = [
  {
    id: '1111-bbbb',
    name: 'folder1',
    path: '1111_bbbb',
    type: 'folder',
    description: null,
    extra: {},
    creator: 'user1',
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
  },
  {
    id: '2222-bbbb',
    name: 'folder2',
    path: '1111_bbbb.2222_bbbb',
    type: 'folder',
    description: null,
    extra: {},
    creator: 'user1',
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
  },
];

export default MOCK_ITEMS;
