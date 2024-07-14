import Scanner, { Token } from './Scanner';

export const Node = {
  Literal: 'Literal',
  Identifier: 'Identifier',
  LambdaDeclaration: 'LambdaDeclaration',
  VariableDeclaration: 'VariableDeclaration',
  BinaryExpression: 'BinaryExpression',
  CallExpression: 'CallExpression',
};

class Parser {
  constructor(code) {
    this.scanner = new Scanner(code);
    this.stack = [];
  }

  nextToken() {
    this.lookahead = this.scanner.lex();
    return this.lookahead;
  }

  parse() {
    return this.parseExpression();
  }

  parseExpression() {
    const token = this.nextToken();
    if (token.type === Token.Punctuator && token.value === '(') {
      const exp1 = this.parseExpression1();
      this.expect(this.nextToken(), { type: Token.Punctuator, value: ')' });
      return exp1;
    }
    if (token.type === Token.Numeric) {
      return {
        type: 'Literal',
        value: token.value,
      };
    }

    if (token.type === Token.Identifier) {
      return {
        type: 'Identifier',
        value: token.value,
      };
    }
    return {
      type: 'Unknown',
    };
  }

  parseExpression1() {
    const token = this.nextToken();
    if (token.type === Token.Keyword && token.value === 'lambda') {
      return this.parseLambda();
    }
    if (token.type === Token.Keyword && token.value === 'let') {
      return this.parseAssignment();
    }
    if (token.type === Token.Punctuator) {
      if (token.value === '(') {
        return this.parseCall();
      }
      return this.parseOperation();
    }
    if (token.type === Token.Identifier) {
      return this.parseCall();
    }
    throw Error('Unexpected expression');
  }

  // eslint-disable-next-line class-methods-use-this
  expect(realNode, expected) {
    let result = true;
    if (expected.type !== undefined) {
      result = result && realNode.type === expected.type;
    }
    if (expected.value !== undefined) {
      result = result && realNode.value === expected.value;
    }
    if (result !== true) {
      console.warn('RealNode is not match expected', realNode, expected);
    }
    return result;
  }

  parseLambda() {
    let token = this.nextToken();
    this.expect(token, { type: Token.Punctuator, value: '(' });
    token = this.nextToken();
    this.expect(token, { type: Token.Identifier });
    const name = token.value;
    token = this.nextToken();
    this.expect(token, { type: Token.Punctuator, value: ')' });
    const expression = this.parseExpression();
    return {
      type: 'LambdaDeclaration',
      parameterName: name,
      body: expression,
    };
  }

  parseAssignment() {
    let token = this.nextToken();
    this.expect(token, { type: Token.Punctuator, value: '(' });
    token = this.nextToken();
    this.expect(token, { type: Token.Punctuator, value: '[' });
    token = this.nextToken();
    this.expect(token, { type: Token.Identifier });
    const name = token.value;
    const init = this.parseExpression();
    token = this.nextToken();
    this.expect(token, { type: Token.Punctuator, value: ']' });
    token = this.nextToken();
    this.expect(token, { type: Token.Punctuator, value: ')' });
    const expression = this.parseExpression();
    return {
      type: 'VariableDeclaration',
      name,
      init,
      expression,
    };
  }

  parseOperation() {
    const { lookahead } = this;
    const operator = lookahead.value;
    const left = this.parseExpression();
    const right = this.parseExpression();
    return {
      type: 'BinaryExpression',
      operator,
      left,
      right,
    };
  }

  parseCall() {
    const { lookahead } = this;
    let callee = null;
    if (lookahead.type === Token.Identifier) {
      const name = lookahead.value;
      callee = {
        type: 'Identifier',
        value: name,
      };
    } else {
      // is a lambda expression
      callee = this.parseExpression1();
      const token = this.nextToken();
      this.expect(token, { type: Token.Punctuator, value: ')' });
    }
    const exp = this.parseExpression();
    return {
      type: 'CallExpression',
      callee,
      argument: exp,
    };
  }
}

export default Parser;
