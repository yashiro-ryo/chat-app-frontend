const isProduction = false;

function v(s: string) {
  if (isProduction) {
    return;
  }
  console.log(s);
}

function e(s: string) {
  if (isProduction) {
    return;
  }
  console.error(s);
}

export default {
  v,
  e,
} as const;
