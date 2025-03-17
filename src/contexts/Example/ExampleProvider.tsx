import { useState, ReactNode } from 'react';
import ExampleContext, { ExampleContextType } from '.';

type Props = { children: ReactNode }

export default function ExampleContextProvider({ children }: Props) {
  const [example, setExample] = useState('I am the context value');

  const context: ExampleContextType = { setExample, example };

  return (
    // <ExampleContext value={context}> // v19
    <ExampleContext.Provider value={context}>
      {children}
    </ExampleContext.Provider>
  );
}

