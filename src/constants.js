import {matrix} from "mathjs";

export const POWER_LABEL = "Power method";
export const POWER_TYPE = "POWER_TYPE";
export const NEWTHON_LABEL = "Newthon method (modified)";
export const NEWTHON_TYPE = "NEWTHON_TYPE";
export const JACOBI_LABEL = "Jacobi method";
export const JACOBI_TYPE = "JACOBI_TYPE";
export const INTRO1 = "Lab work №3 by Dmytro Ostapenko";
export const INTRO2 = "Collecting user input";
export const OUTRO2 = "Input is received";
export const INITIAL_ACCURACY = 0.001;
export const JACOBI_ITERATIONS = 4;
export const NEWTHON_ITERATIONS = 500;
export const TASK_1_MATRIX = matrix([
  [3, 1, 0, 1],
  [1, 2, 1, 0],
  [0, 1, 3, 1],
  [1, 0, 1, 4],
]);
export const JACOBI_MAX_ITERATONS = 4;
export const TASK_2_SYSTEM = (x) => [
  x[0] * x[1] - x[1] * x[1] - 1,
  x[0] * x[0] * x[1] + x[1] - 5,
];
export const TASK_2_START = [1, 1];
export const TASK_2_JACOBIAN = (x) => [
  [x[1], x[0] - 2 * x[1]],
  [2 * x[0] * x[1], x[0] * x[0] + 1],
];
