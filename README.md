# Quickstart

## configs
```bash
# All at once
npm i tailwindcss @tailwindcss/vite react-router @tanstack/react-query
npm i -D @tanstack/eslint-plugin-query

npm i tailwindcss @tailwindcss/vite
npm i react-router
npm i @tanstack/react-query
npm i -D @tanstack/eslint-plugin-query
```

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```


## Tailwind
Make sure to import tailwind in `index.css`
```css
@import "tailwindcss";
```

## React Router cheat sheet
```jsx
<Link to="/">route</Link>

const navigate = useNavigate();

<Outlet /> // for showing nested children

// params
<Route path="/concerts/:city" element={<City />} />
const { city } = useParams();

const [searchParams] = useSearchParams();
const question = searchParams.get('q')
```

## Tanstack Query cheat sheet
```jsx
// get
import { useQuery } from "@tanstack/react-query"
import { useRef } from "react";

const { data, isPending, isError, error } = useQuery<PostType>({
  queryKey: ['ITEMS', id],
  queryFn: () => getITEM(id),
});

if (isPending) return <p>Loading...</p>;
if (isError) return <p>Error: {error.message}</p>;

// TS knows data is available
const { } = data;


// mutate
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useRef } from "react";

const formRef = useRef<HTMLFormElement>(null);
const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: createITEM,
  onSuccess: (newData, variables) => {
    // queryClient.invalidateQueries({ queryKey: ['ITEMS'] });
    // queryClient.setQueryData<ITEM[]>(['ITEMS'], (oldData = []) => [...oldData, newData]);

    // formRef.current?.reset();
  },
});

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // always the element the lister is bound to
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form)) as unknown as ITEM;

  mutate(data);
};
```


## Context
```jsx
import { useContext } from 'react'
// import { use } from 'react' // v19
import ExampleContext from "contexts/Example"

export default function HomePage() {
  // const { example } = use(ExampleContext); // v19
  const { example } = useContext(ExampleContext);
  console.log('example:', example);
```