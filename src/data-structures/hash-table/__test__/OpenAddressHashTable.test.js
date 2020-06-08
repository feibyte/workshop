import OpenAddressHashTable from '../OpenAddressHashTable';

describe('OpenAddressHashTable', () => {
  it('should be able to get correct value after setting key and value', () => {
    const hashTable = new OpenAddressHashTable();
    hashTable.set('shark', { type: 'fish' });
    hashTable.set('tiger', { type: 'animal' });

    expect(hashTable.get('shark')).toEqual({
      type: 'fish',
    });
  });

  it('should return falsy after deleting item by key', () => {
    const hashTable = new OpenAddressHashTable();
    hashTable.set('shark', { type: 'fish' });
    hashTable.set('tiger', { type: 'animal' });

    hashTable.delete('shark');
    expect(hashTable.get('shark')).toBeFalsy();
  });


  it('should work even the key has same hash value', () => {
    const hashTable = new OpenAddressHashTable();
    hashTable.set('dog', { type: 'animal' });
    hashTable.set('bird', { type: 'bird' });
    hashTable.set('tiger', { type: 'animal' });
    hashTable.set('shark', { type: 'fish' });

    hashTable.delete('dog');
    expect(hashTable.get('shark')).toBeTruthy();
    expect(hashTable.get('bird')).toBeTruthy();
  });

  it('should rehasing when size become larger', () => {
    const hashTable = new OpenAddressHashTable();
    (new Array(20)).fill(0).forEach((item, index) => {
      hashTable.set(index, index);
    });

    expect(hashTable.size).toBe(20);
  });
});
