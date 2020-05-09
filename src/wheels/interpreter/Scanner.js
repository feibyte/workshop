export const Token = {
  Keyword: 'Keyword',
  Identifier: 'Identifier',
  Numeric: 'Numeric',
  Punctuator: 'Punctuator',
  EOF: 'EOF',
};

const Keywords = ['let', 'lambda'];

const Identifier = /[a-zA-Z]+/;

const Numeric = /[0-9]+/;

const Punctuator = ['+', '-', '*', '/', '(', ')', '[', ']'];


class Scanner {
  constructor(code) {
    this.source = code;
    this.index = 0;
  }

  eof() {
    return this.index >= this.source.length;
  }

  skipWhiteSpace() {
    while (!this.eof()) {
      const ch = this.source.charCodeAt(this.index);
      if (ch === 0x20 || ch === 0x0A) {
        this.index++;
      } else {
        break;
      }
    }
  }

  lex() {
    this.skipWhiteSpace();
    if (this.eof()) {
      return {
        type: Token.EOF,
        value: '',
      };
    }
    const cp = this.source[this.index];

    if (Punctuator.includes(cp)) {
      return this.scanPunctuator();
    }

    if (Numeric.test(cp)) {
      return this.scanNumeric();
    }

    if (Identifier.test(cp)) {
      return this.scanIdentifier();
    }

    throw new Error('Unexpected token');
  }

  scanPunctuator() {
    const value = this.source[this.index];
    this.index++;
    return {
      type: Token.Punctuator,
      value,
    };
  }

  scanNumeric() {
    const start = this.index;
    while (!this.eof() && Numeric.test(this.source[this.index])) {
      this.index++;
    }
    return {
      type: Token.Numeric,
      value: Number.parseInt(this.source.slice(start, this.index), 10),
    };
  }

  scanIdentifier() {
    const start = this.index;
    while (!this.eof() && Identifier.test(this.source[this.index])) {
      this.index++;
    }
    const id = this.source.slice(start, this.index);
    if (Keywords.includes(id)) {
      return {
        type: Token.Keyword,
        value: id,
      };
    }
    return {
      type: Token.Identifier,
      value: id,
    };
  }
}

export default Scanner;
