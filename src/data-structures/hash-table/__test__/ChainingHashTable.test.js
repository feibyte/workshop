import ChainingHashTable from '../ChainingHashTable';

describe('ChainingHashTable', () => {
  it('should be able to get correct value after setting key and value', () => {
    const hashTable = new ChainingHashTable();
    hashTable.set('shark', { type: 'fish' });
    hashTable.set('tiger', { type: 'animal' });

    expect(hashTable.get('shark')).toEqual({
      type: 'fish',
    });
  });
});
