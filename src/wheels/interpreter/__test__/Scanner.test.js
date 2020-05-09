import Scanner from '../Scanner';

describe('Scanner', () => {
  it('should return Numeric type and value given input is a numeric', () => {
    const scanner = new Scanner('33');
    expect(scanner.lex()).toEqual({
      type: 'Numeric',
      value: 33,
    });
  });

  it('should return Keyword type and value given input is a keyword', () => {
    const scanner = new Scanner('let');
    expect(scanner.lex()).toEqual({
      type: 'Keyword',
      value: 'let',
    });
  });

  it('should return Identifier type and value given input is a common string', () => {
    const scanner = new Scanner('user');
    expect(scanner.lex()).toEqual({
      type: 'Identifier',
      value: 'user',
    });
  });

  it('should return Punctuator type and value given input is a punctuator', () => {
    const scanner = new Scanner('+');
    expect(scanner.lex()).toEqual({
      type: 'Punctuator',
      value: '+',
    });
  });

  it('should skip white space and return numeric type and value given input start with white space', () => {
    const scanner = new Scanner(' 345');
    expect(scanner.lex()).toEqual({
      type: 'Numeric',
      value: 345,
    });
  });

  it('should return a series of type and value when given a long correct code', () => {
    const scanner = new Scanner('(* 13 5)');
    const tokens = [];
    let token;
    do {
      token = scanner.lex();
      tokens.push(token);
    } while (token && token.type !== 'EOF');
    expect(tokens).toEqual([{
      type: 'Punctuator',
      value: '(',
    }, {
      type: 'Punctuator',
      value: '*',
    }, {
      type: 'Numeric',
      value: 13,
    }, {
      type: 'Numeric',
      value: 5,
    }, {
      type: 'Punctuator',
      value: ')',
    }, {
      type: 'EOF',
      value: '',
    }]);
  });
});
