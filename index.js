import {intro, select, group, text, outro, cancel, log} from "@clack/prompts";
import {
  INTRO1,
  INTRO2,
  OUTRO2,
  POWER_LABEL,
  POWER_TYPE,
  JACOBI_LABEL,
  JACOBI_TYPE,
  NEWTHON_LABEL,
  NEWTHON_TYPE,
  INITIAL_ACCURACY,
} from "./src/constants.js";
import {getFunction} from "./src/calculations.js";

intro(INTRO1);

intro(INTRO2);
const answers = await group(
  {
    method: () =>
      select({
        message: "Select desired method",
        options: [
          {label: POWER_LABEL, value: POWER_TYPE},
          {label: NEWTHON_LABEL, value: NEWTHON_TYPE},
          {label: JACOBI_LABEL, value: JACOBI_TYPE},
        ],
        initialValue: POWER_TYPE,
      }),
    accuracy: () =>
      text({
        message: "Choose accuracy",
        initialValue: INITIAL_ACCURACY,
        defaultValue: INITIAL_ACCURACY,
        placeholder: INITIAL_ACCURACY.toString(),
        validate: (s) => {
          if (isNaN(Number(s))) {
            return "Not a number";
          }
        },
      }),
  },
  {
    onCancel: () => {
      cancel("Operation cancelled");
      process.exit(0);
    },
  },
);
outro(OUTRO2);

const solve = getFunction(answers.method);
const result = solve(answers.accuracy);

log.success(`Result: ${result}`);
