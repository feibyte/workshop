import Parser from '../Parser';

describe('Parser', () => {
  it('should return correct ast tree for operation expression', () => {
    const parser = new Parser('(+ 3 4)');
    const ast = parser.parse();
    expect(ast).toEqual({
      type: 'BinaryExpression',
      operator: '+',
      left: {
        type: 'Literal',
        value: 3,
      },
      right: {
        type: 'Literal',
        value: 4,
      },
    });
  });

  it('should return correct ast tree for declaration expression', () => {
    const parser = new Parser('(let ([count 3]) 4)');
    const ast = parser.parse();
    expect(ast).toEqual({
      type: 'VariableDeclaration',
      name: 'count',
      init: {
        type: 'Literal',
        value: 3,
      },
      expression: {
        type: 'Literal',
        value: 4,
      },
    });
  });

  it('should return correct ast tree for call expression', () => {
    const parser = new Parser('(fn 45)');
    const ast = parser.parse();
    expect(ast).toEqual({
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        value: 'fn',
      },
      argument: {
        type: 'Literal',
        value: 45,
      },
    });
  });

  it('should return correct ast tree for lambda function', () => {
    const parser = new Parser('(lambda (x) (+ x 45))');
    const ast = parser.parse();
    expect(ast).toEqual({
      type: 'LambdaDeclaration',
      parameterName: 'x',
      body: {
        type: 'BinaryExpression',
        operator: '+',
        left: {
          type: 'Identifier',
          value: 'x',
        },
        right: {
          type: 'Literal',
          value: 45,
        },
      },
    });
  });

  it('should return correct ast tree for call immediate lambda function', () => {
    const parser = new Parser('((lambda (x) (+ x 45)) 3)');
    const ast = parser.parse();
    expect(ast).toEqual({
      type: 'CallExpression',
      callee: {
        type: 'LambdaDeclaration',
        parameterName: 'x',
        body: {
          type: 'BinaryExpression',
          operator: '+',
          left: {
            type: 'Identifier',
            value: 'x',
          },
          right: {
            type: 'Literal',
            value: 45,
          },
        },
      },
      argument: {
        type: 'Literal',
        value: 3,
      },
    });
  });

  it('should return correct ast tree for complex function', () => {
    const parser = new Parser('(let ([ fn (lambda (x) (+ x 45)) ]) 45)');
    const ast = parser.parse();
    expect(ast).toEqual({
      init: {
        body: {
          left: {
            type: 'Identifier',
            value: 'x',
          },
          operator: '+',
          right: {
            type: 'Literal',
            value: 45,
          },
          type: 'BinaryExpression',
        },
        parameterName: 'x',
        type: 'LambdaDeclaration',
      },
      expression: {
        type: 'Literal',
        value: 45,
      },
      name: 'fn',
      type: 'VariableDeclaration',
    });
  });
});
