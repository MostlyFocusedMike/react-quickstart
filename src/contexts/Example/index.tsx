import { createContext, Dispatch, SetStateAction } from 'react';

export type ExampleContextType = {
  example: string;
  setExample: Dispatch<SetStateAction<string>>;
}

const ExampleContext = createContext<ExampleContextType>({} as ExampleContextType);

export default ExampleContext;
