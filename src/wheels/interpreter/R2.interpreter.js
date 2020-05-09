import Context from './Context';
import Parser, { Node } from './Parser';

class Interpreter {
  constructor(code) {
    const parser = new Parser(code);
    this.ast = parser.parse();
    this.context = new Context();
  }

  exec() {
    return this.interpret(this.ast);
  }

  // eslint-disable-next-line consistent-return
  interpret(node) {
    // eslint-disable-next-line default-case
    switch (node.type) {
      case Node.Literal:
        return node.value;
      case Node.Identifier:
        return this.lookup(node.value);
      case Node.BinaryExpression:
        return this.interpretBinary(node);
      case Node.LambdaDeclaration:
        return this.declareLambda(node);
      case Node.VariableDeclaration:
        return this.declareVar(node);
      case Node.CallExpression:
        return this.interpretCall(node);
      default:
        throw Error('Unknown node');
    }
  }

  lookup(key) {
    return this.context.lookup(key);
  }

  // eslint-disable-next-line consistent-return
  interpretBinary(node) {
    // eslint-disable-next-line default-case
    switch (node.operator) {
      case '+':
        return this.interpret(node.left) + this.interpret(node.right);
      case '-':
        return this.interpret(node.left) - this.interpret(node.right);
      case '*':
        return this.interpret(node.left) * this.interpret(node.right);
      case '/':
        return this.interpret(node.left) / this.interpret(node.right);
    }
  }

  declareLambda(node) {
    const { parameterName, body } = node;
    return { body, context: this.context, parameterName };
  }

  declareVar(node) {
    const { name, init, expression } = node;
    const newContext = new Context(this.context);
    newContext.add(name, this.interpret(init));
    this.context = newContext;
    return this.interpret(expression);
  }

  interpretCall(node) {
    const { callee, argument } = node;
    let closure;
    if (callee.type === Node.Identifier) {
      closure = this.lookup(callee.value);
    } else if (callee.type === Node.LambdaDeclaration) {
      closure = this.declareLambda(callee);
    } else {
      throw new Error(`${callee} is not function`);
    }
    if (typeof closure !== 'object') {
      throw new Error(`${callee} is not function`);
    }
    const { context, body, parameterName } = closure;
    const fnContext = new Context(context);
    fnContext.add(parameterName, this.interpret(argument));
    const oldContext = this.context;
    this.context = fnContext;
    const result = this.interpret(body);
    this.context = oldContext;
    return result;
  }
}

export default Interpreter;
