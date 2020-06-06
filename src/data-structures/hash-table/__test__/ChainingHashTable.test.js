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

  it('return correct hash code', () => {
    const hashTable = new ChainingHashTable();
    expect(hashTable.hashCode('A')).toEqual(0x41);
    expect(hashTable.hashCode('Hello')).toEqual(0x042628b2);
  });
});
