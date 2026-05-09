import { useState } from "react";
import { getAllFactors, getPrimeFactors, getSimplifiedRadical, getSqrt, isPrimeNum, parseNum } from "../utils";

export const AllFactors = () => {
  const [baseNum, setBaseNum] = useState<number | ''>('');
  const [factors, setFactors] = useState<number[]>([]);
  const primes = getPrimeFactors(baseNum || 1);

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const number = parseNum(input.value);
    if (!number) return setBaseNum('');

    if (number < 1_000_000_000) {
      setBaseNum(number)
      setFactors(getAllFactors(number));
    }
  }

  const { coefficient, radicand, isRadicandOne } = getSimplifiedRadical(baseNum || 1);

  return <div className="border-2 w-90 p-2 rounded-2xl">
    <h2 className="text-2xl">Number Data</h2>
    <form>
      <label>
        Number:
        <input
          type="number"
          name="to-factor"
          id="to-factor"
          min={0}
          onChange={handleChange}
          className="border m-1 rounded p-1"
          value={baseNum}
        />
      </label>
    </form>

    <p>Factors</p>
    <p className="min-h-6">{factors.map((num, idx) => {
      const isPrime = isPrimeNum(num);
      return <span key={num}>
        <span className={isPrime ? 'underline italic' : ''}>{num}</span>{factors.length === idx + 1 ? '' : ', '}
      </span>
    })}</p>

    <p>Prime Factorization</p>
    <p className="min-h-6">
      {factors.length > 2
        && primes.map(([num, power], idx) => {
          return <span key={num}>
            <span>{num}{power > 1 && <sup>{power}</sup>}</span>
            {primes.length === idx + 1 ? '' : ' x '}
          </span>
        })
      }
    </p>

    <p>Square Root</p>
    <p>
      <span >{baseNum !== '' && !isRadicandOne && <span>
        {coefficient !== 1 && <span className="font-bold">{coefficient}</span>}
        {radicand && <span className="font-bold">√{radicand}</span>} ≈
      </span>
      }</span>{' '}
      <span className="italic">
        {baseNum !== '' && getSqrt(baseNum)}
      </span>
    </p>

  </div >
}
