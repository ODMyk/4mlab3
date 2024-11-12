import {
  abs,
  atan2,
  cos,
  sin,
  diag,
  identity,
  transpose,
  multiply,
} from "mathjs";

export const jacobiMethod = (matrix, tol = 1e-6, maxIter = 100) => {
  const n = matrix.size()[0];
  let eigenvalues = diag(matrix);

  for (let iter = 0; iter < maxIter; iter++) {
    const {row: p, col: q, value: maxVal} = findMaxOffDiagonal(matrix);

    if (Math.abs(maxVal) < tol) break;

    const theta =
      0.5 * atan2(2 * maxVal, matrix.get([p, p]) - matrix.get([q, q]));
    const cosVal = cos(theta);
    const sinVal = sin(theta);

    matrix = rotateMatrix(matrix, p, q, cosVal, sinVal);
  }

  eigenvalues = diag(matrix);
  return {eigenvalues};
};

const rotateMatrix = (matrix, p, q, cosVal, sinVal) => {
  const rotationMatrix = identity(matrix.size()[0]);
  rotationMatrix.set([p, p], cosVal);
  rotationMatrix.set([q, q], cosVal);
  rotationMatrix.set([p, q], -sinVal);
  rotationMatrix.set([q, p], sinVal);

  return multiply(multiply(transpose(rotationMatrix), matrix), rotationMatrix);
};

const findMaxOffDiagonal = (matrix) => {
  const n = matrix.size()[0];
  let maxVal = 0;
  let p = 0;
  let q = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const value = matrix.get([i, j]);
      if (abs(value) > abs(maxVal)) {
        maxVal = value;
        p = i;
        q = j;
      }
    }
  }

  return {row: p, col: q, value: maxVal};
};
