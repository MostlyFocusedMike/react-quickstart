import perfectSquares from './squares.json';

const gafMemo = {} as any;
export const getAllFactors = (number: number) => {
  const num = Math.abs(number);
  if (num === 0) return [];
  if (gafMemo[num]) return gafMemo[num] as number[];
  const res = [];

  for (let i = 1; i < (num / 2) + 1; i++) {
    console.log('num:', num);
    console.log('not run:',);
    if (num % i === 0) res.push(i);
  }
  if (num !== 1) res.push(num);

  gafMemo[num] = res;
  return res;
}

const memo = {} as { [key: string]: [number, number][] }
export const getPrimeFactors = (number: number): [number, number][] => {
  const num = Math.abs(number);
  if (memo[num]) return memo[num];

  const primes = getAllFactors(num)
    .filter(isPrimeNum)
    .filter(n => n != 1 && n != num);

  let testNum = num;

  const powers = new Map(primes.map(x => [x, 0]))

  let limit = 0;
  while (primes.length && limit < 10) {
    if (testNum % primes[0] === 0) {
      testNum /= primes[0]
      powers.set(primes[0], Number(powers.get(primes[0])) + 1);
    } else {
      primes.shift();
    }
    limit++;
  }
  const res = Array.from(powers);
  memo[num] = res;

  return res;
}

const ipnMemo = {} as any;
export const isPrimeNum = (number: number) => {
  const num = Math.abs(number);
  if (num in ipnMemo) return ipnMemo[num];

  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) {
      ipnMemo[num] = false;
      return false;
    }
  }

  const res = num > 1
  ipnMemo[num] = res;
  return res;
}

const sqrtMemo = {} as any;
export const getSqrt = (number: number) => {
  const num = Math.abs(number);
  if (sqrtMemo[num]) return sqrtMemo[num];

  const res = Math.sqrt(num);
  sqrtMemo[num] = res;

  return res;
}

const parseMemo = {} as any;
export const parseNum = (num: number | string) => {
  if (parseMemo[num]) return parseMemo[num];
  const res = Number(num);
  parseMemo[num] = res;

  return res;
}

const srMemo = {} as any;
export const getSimplifiedRadical = (num: number) => {
  if (srMemo[num]) return srMemo[num];
  let radicand = Math.abs(num);
  let coefficient = 1;

  for (let i = 0; i < perfectSquares.length; i++) {
    const perfSquare = perfectSquares[i];
    if (perfSquare > radicand) break;

    let counter = 0;
    while (true) {
      if (radicand % perfSquare == 0) {
        counter += 1;
        if (counter > 100) break;
        radicand /= perfSquare;
        coefficient *= perfSquare ** 0.5;
        continue;
      }
      break;
    }
  }
  const res = {
    coefficient,
    radicand,
    isRadicandOne: radicand === 1,
    isRadicandZero: radicand === 0,
  }
  srMemo[num] = res;

  return res;
}
