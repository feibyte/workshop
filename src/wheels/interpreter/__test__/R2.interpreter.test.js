import Interpreter from '../R2.interpreter';

describe('Interpreter', () => {
  it('should return correct value for binary expression', () => {
    const interpreter = new Interpreter('(* (+ 1 2) (+ 3 4)))');
    expect(interpreter.exec()).toEqual(21);
  });

  it('should return exec value given lambda function', () => {
    const interpreter = new Interpreter('((lambda (x) (* 2 x)) 3))');
    expect(interpreter.exec()).toEqual(6);
  });

  it('should return correct value given var and lambda', () => {
    const interpreter = new Interpreter(`
      (let ([x 2])
        (let ([f (lambda (y) (* x y))])
      (f 3))))
    `);
    expect(interpreter.exec()).toEqual(6);
  });

  it('should return correct value given var and lambda and same var', () => {
    const interpreter = new Interpreter(`
      (let ([x 2])
       (let ([f (lambda (y) (* x y))])
         (let ([x 4])
           (f 3)))))
    `);
    expect(interpreter.exec()).toEqual(6);
  });
});
