import { useEffect, useRef, useState } from "react"
import { getAllFactors, getSimplifiedRadical } from "../utils";

export const Quadratic = () => {
  const [numAWidth, setNumAWidth] = useState(13.9921875);
  const [numBWidth, setNumBWidth] = useState(35);
  const [formState, setFormState] = useState({ a: 1, b: 1, c: 1 })
  const numARef = useRef(null);
  const numBRef = useRef(null);

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.value.length < 5) {
      setFormState({ ...formState, [input.name]: input.value })
    }
  }

  useEffect(() => {
    const aValEl = numARef.current as unknown as HTMLElement
    const newAWidth = aValEl?.getBoundingClientRect().width;
    setNumAWidth(newAWidth);
    const bValEL = numBRef.current as unknown as HTMLElement;
    const newBWidth = bValEL?.getBoundingClientRect().width
    setNumBWidth(newBWidth);
  }, [formState]);

  const { a, b, c } = formState;
  const rawA = Number(a)
  const rawB = Number(b)
  const rawC = Number(c)
  const discriminant = Number(b) ** 2 - 4 * Number(a) * Number(c)
  const absDiscriminant = Math.abs(discriminant)
  const { coefficient, radicand, isRadicandOne, isRadicandZero } = getSimplifiedRadical(absDiscriminant);
  let factoredCoeff = 1
  let bTerm = Number(b);
  let radicandCoeff = coefficient;
  const iChar = discriminant < 0 ? "𝑖" : ''
  // radicand doesn't change
  let denominator = 2 * Number(a);

  let set1 = new Set(getAllFactors(bTerm));
  let set2 = new Set(getAllFactors(radicandCoeff));
  let gcf = Math.max(...Array.from(set1.intersection(set2)) as unknown as [], 1);

  factoredCoeff = gcf;
  bTerm /= gcf
  radicandCoeff /= gcf

  set1 = new Set(getAllFactors(factoredCoeff));
  set2 = new Set(getAllFactors(denominator));
  gcf = Math.max(...Array.from(set1.intersection(set2)) as unknown as [], 1);

  factoredCoeff /= gcf;
  denominator /= gcf;

  let isPrettyTerm = false;
  let prettyTerm = '';
  const showRadicandCoeff = radicandCoeff !== 1 ? radicandCoeff : ''
  const uglyTerm = `± ${showRadicandCoeff}${iChar}${radicand ? '√' : ''} ${radicand}`

  if (isRadicandOne) {
    isPrettyTerm = true;
    prettyTerm = `± ${showRadicandCoeff}${iChar}`;
  } else if (isRadicandZero) {
    isPrettyTerm = true;
  }

  const lineStart = 15;
  const lineWidth = 30 + numAWidth + numBWidth

  return <div className="border-2 w-90 p-2 rounded-2xl">
    <h2 className="text-2xl">Quadratic Formula</h2>
    <form>
      <label className="block">
        a
        <input type="number" name="a" id="a" onChange={handleChange}
          className="border m-1 rounded p-1"
          value={a} />
      </label>
      <label className="block">
        b
        <input type="number" name="b" id="b" onChange={handleChange}
          className="border m-1 rounded p-1"
          value={b} />
      </label>
      <label className="block">
        c
        <input type="number" name="c" id="c" onChange={handleChange}
          className="border m-1 rounded p-1"
          value={c} />
      </label>
    </form>
    <p>Discriminant: {discriminant}</p>

    <div style={{ display: 'flex', gap: '1rem' }}>
      <div>
        <p>Raw</p>
        <math display="block">
          <mrow>
            <mi>x</mi>
            <mo>=</mo>
            <mfrac>
              <mrow>
                <mrow>
                  <mo>−</mo>
                  <mi>b</mi>
                </mrow>
                <mo>±</mo>
                <msqrt>
                  <mrow>
                    <msup>
                      <mi>b</mi>
                      <mn>2</mn>
                    </msup>
                    <mo>−</mo>
                    <mrow>
                      <mn>4</mn>
                      <mo>⁢</mo>
                      <mi>a</mi>
                      <mo>⁢</mo>
                      <mi>c</mi>
                    </mrow>
                  </mrow>
                </msqrt>
              </mrow>
              <mrow>
                <mn>2</mn>
                <mo>⁢</mo>
                <mi>a</mi>
              </mrow>
            </mfrac>
          </mrow>
        </math>
      </div>

      <div>
        <p>Final</p>
        <svg viewBox="0 0 150 80" width="150" height="80" xmlns="http://www.w3.org/2000/svg" className="border">
          <text ref={numARef} x="20" y="35" fill="white">
            {factoredCoeff !== 1 && `${factoredCoeff}(`}{-1 * bTerm}
          </text>
          <text ref={numBRef} x={25 + numAWidth} y="35" fill="white">
            {isPrettyTerm ? prettyTerm : uglyTerm}{factoredCoeff !== 1 && `)`}
          </text>

          <line x1={lineStart} x2={lineWidth} y1="40" y2="40" stroke="white" />

          <text x={20 + (numAWidth + numBWidth) / 2} y="60" fill="white">{denominator}</text>
        </svg>
      </div>
    </div>
  </div>
}