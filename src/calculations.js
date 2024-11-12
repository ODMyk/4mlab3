import {
  JACOBI_MAX_ITERATONS,
  JACOBI_TYPE,
  NEWTHON_ITERATIONS,
  NEWTHON_TYPE,
  POWER_TYPE,
  TASK_1_MATRIX,
  TASK_2_JACOBIAN,
  TASK_2_START,
  TASK_2_SYSTEM,
} from "./constants.js";
import {newthonMethod} from "./newthonMethod.js";
import {powerMethod} from "./powerMethod.js";
import {jacobiMethod} from "./jacobiMethod.js";

import {inv} from "mathjs";

export const getFunction = (type) => {
  if (type === NEWTHON_TYPE) {
    return newthon;
  }
  if (type === JACOBI_TYPE) {
    return jacobi;
  }
  if (type === POWER_TYPE) {
    return power;
  }
};

const power = (tol) => {
  const result = powerMethod(inv(TASK_1_MATRIX), tol);

  return result.eigenvalue;
};

const jacobi = (tol) => {
  const result = jacobiMethod(TASK_1_MATRIX, tol, JACOBI_MAX_ITERATONS);

  return result.eigenvalues;
};

const newthon = (tol) => {
  const result = newthonMethod(
    TASK_2_SYSTEM,
    TASK_2_JACOBIAN,
    TASK_2_START,
    tol,
    NEWTHON_ITERATIONS,
  );

  return result;
};
