import {matrix} from "mathjs";

export const createIdentityMatrix = (size) => ({
  size,
  rows: Array.from({length: size}).map((_, i) =>
    Array.from({length: size}).map((_, j) => (i === j ? 1 : 0)),
  ),
});

export const multiplyMatrices = (mat1, mat2) => {
  const result = {
    size: mat1.size,
    rows: Array.from({length: mat1.size}, () =>
      Array(mat2.rows[0].length).fill(0),
    ),
  };
  for (let i = 0; i < mat1.size; i++) {
    for (let j = 0; j < mat2.rows[0].length; j++) {
      for (let k = 0; k < mat2.size; k++) {
        result.rows[i][j] += mat1.rows[i][k] * mat2.rows[k][j];
      }
    }
  }
  return result;
};

const createPermutationMatrix = (size, i, j) => {
  const permutationMatrix = {
    size,
    rows: Array.from({length: size}, (_, rowIndex) =>
      Array.from({length: size}, (_, colIndex) =>
        rowIndex === colIndex ? 1 : 0,
      ),
    ),
  };
  [permutationMatrix.rows[i], permutationMatrix.rows[j]] = [
    permutationMatrix.rows[j],
    permutationMatrix.rows[i],
  ];
  return permutationMatrix;
};

const createScalingMatrix = (size, i, factor) => {
  const scalingMatrix = {
    size,
    rows: Array.from({length: size}, (_, rowIndex) =>
      Array.from({length: size}, (_, colIndex) =>
        rowIndex === colIndex ? 1 : 0,
      ),
    ),
  };
  scalingMatrix.rows[i][i] = factor;
  return scalingMatrix;
};

const createEliminationMatrix = (size, i, j, factor) => {
  const eliminationMatrix = {
    size,
    rows: Array.from({length: size}, (_, rowIndex) =>
      Array.from({length: size}, (_, colIndex) =>
        rowIndex === colIndex ? 1 : 0,
      ),
    ),
  };
  eliminationMatrix.rows[j][i] = -factor;
  return eliminationMatrix;
};

export const solveGauss = (matrix) => {
  const n = matrix.size;
  let a = {size: n, rows: matrix.rows.map((row) => row.slice())};

  for (let k = 0; k < n; k++) {
    let maxRow = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(a.rows[i][k]) > Math.abs(a.rows[maxRow][k])) {
        maxRow = i;
      }
    }

    if (maxRow !== k) {
      const permutationMatrix = createPermutationMatrix(n, k, maxRow);
      a = multiplyMatrices(permutationMatrix, a);
    }

    const scalingMatrix = createScalingMatrix(n, k, 1 / a.rows[k][k]);
    a = multiplyMatrices(scalingMatrix, a);

    for (let i = k + 1; i < n; i++) {
      const factor = a.rows[i][k];
      const eliminationMatrix = createEliminationMatrix(n, k, i, factor);
      a = multiplyMatrices(eliminationMatrix, a);
    }
  }

  for (let k = n - 1; k >= 0; k--) {
    for (let i = k - 1; i >= 0; i--) {
      const factor = a.rows[i][k];
      const eliminationMatrix = createIdentityMatrix(n);
      eliminationMatrix.rows[i][k] = -factor;
      a = multiplyMatrices(eliminationMatrix, a);
    }
  }

  const x = Array.from({length: n}).map((_, i) => a.rows[i][n]);

  return {
    solution: x,
  };
};

export const newthonMethod = (
  f,
  jacobian,
  start,
  tolerance = 1e-6,
  maxIterations = 100,
) => {
  let x = start;
  let iteration = 0;

  while (iteration < maxIterations) {
    const fx = f(x);
    const jacobianMatrix = jacobian(x);

    const deltaX = solveGauss({
      size: jacobianMatrix.length,
      rows: [
        [...jacobianMatrix[0], -fx[0]],
        [...jacobianMatrix[1], -fx[1]],
      ],
    }).solution;

    x = [x[0] + deltaX[0], x[1] + deltaX[1]];

    if (
      Math.sqrt(deltaX[0] * deltaX[0] + deltaX[1] * deltaX[1]) < tolerance ||
      Math.sqrt(fx[0] * fx[0] + fx[1] * fx[1]) < tolerance
    ) {
      return matrix(x);
    }

    iteration++;
  }

  console.error("Newton's method did not converge.");
  return null;
};
