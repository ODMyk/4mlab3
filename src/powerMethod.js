import {multiply, ones, divide, abs, max} from "mathjs";

export const powerMethod = (matrix, tol = 1e-6, maxIter = 1000) => {
  const n = matrix.size()[0];
  let x = ones(n, 1);
  let lambdaOld = 0;
  let result;

  for (let i = 0; i < maxIter; i++) {
    const xNew = multiply(matrix, x);
    const lambda = max(abs(xNew));
    x = divide(xNew, lambda);

    result = {eigenvalue: 1 / lambda, eigenvector: x, success: false};
    if (Math.abs(lambda - lambdaOld) < tol) {
      result.success = true;
      break;
    }
    lambdaOld = lambda;
  }
  return result;
};
