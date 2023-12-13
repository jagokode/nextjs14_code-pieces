## Setting Prisma

### 1. Installation

```bash
npm install prisma

npx prisma init --datasource-provider sqlite
```

### 2. Define Model in schema.prisma

### 3. Migrate

```bash
npx prisma migrate dev
```

Enter a name for the new migration: add pieces

### 4. Start Project

```bash
npm run dev
```

## Creating Records

### 1. Create Prisma Client to access Database

create folder in src : db

create file in db : index.ts

### 2. Create a form in CreatePiecesPage

### 3. Define a Server Action.

What is Server Actions ?

-   Number one way to change data in next app
-   Super close integration with HTML forms
-   Server actions are functions that will be called with the values a user entered into a form

in CreatePiecesPage :

```bash
async function createPiece() {
    'use server';

    // your code
}
```

## Fetching Data

### 1. Create a server component

### 2. Mark the component as 'async'

### 3. Make an HTTP request or directly access database to get data

### 4. Render data directly or pass it to a child component

## Install Monaco Editor

```bash
npm i @monaco-editor/react
```

## Server Actions in Client Component

### Option 1

-   Define Server Action in a Server Component and pass it as props to the Client Component

Server Component can't pass event handlers down to client components

### Option 2

-   Define Server Action in a separate file and import it into the Client Component

To create a Server Action in a separate file: just write 'use server' once at the top of the file

```bash
'use server';

export async function myFunctionName() {
    // your code...
}
```

## Options for Calling Server Action in Client Component

### Option 1

-   Use 'bind' to customize the arguments
-   First argument will be the boung argument
-   Second argument will be 'Form Data', containing data form (if any exists)

Client Component:

```bash
'use client'
import * as actions from 'actions'

function ClientComponent() {
    const [code, setCode] = useState('')

    const editCodeAction = actions.editData.bind(null,code)

    return (
        <form action={editCodeAction}>
            <button type='submit'>Submit</button>
        </form>
    )
}
```

separate Server Action :

```bash
'use server'

export async function editData(code: string, formData: FormData) {
    // your code...
}
```

Form will work even if user isn't running javascript in their browser.

### Option 2

-   No messing around with 'bind' function
-   Closer to classic React behaviour

Client Component :

```bash
'use client'
import { startTransition } from 'react'
import * as actions from 'actins'

function ClientComponent() {
    const [code, setCode] = useState('')

    const handleSubmit = () => {
        // Make sure, you have updated data before attempting to navigate
        startTransition(async () => {
            await actions.editData(code)
        })
    }

    return (
        <button onClick={handleSubmit}>Submit</button>
    )
}
```

separated Server Action :

```bash
'use server'

export async function editData(code: string) {
    // your code...
}
```

Only the arguments passed directly to the server action are received

## Error Handling with Server Actions

-   A big point of forms is that they can work without JS in browser
-   Now, Forms in our pages are sending info to a server action
-   We need communicate info **from a server action back to a page**
-   React-dom contains a hook called 'useFormState' specially for this

### How a Server Form works without useFormState

Page Component --> Input Data --> Form Data --> Server Action

### How a Server Form works with useFormState

1. Page Component (Client Component) :

    - Form State : message: ''

2. Form State embedded in browser
3. Sending in Form Data object including Form State
4. Server Action recieves 2 Data : Form Data and Form State
5. If there are some issues, Server Action can communicate back to Page Component
6. Page Component :

    - Form State : message: 'Some issue'

## Special File Names in the 'app' Folder

1. **page.tsx** : display the primary content for the page
2. **layout.tsx** : wraps up the currently displayed page. Use tho show content common accros many pages
3. **not-found.tsx** : displayed when we call 'not-found' function
4. **loading.tsx** : displayed when a server component is fetchind data
5. **error.tsx** : displayed when an error occurs in a server component
6. **route.tsx** : defines API endpoints

## Production

```bash
npm run build

npm run start
```

### Caching

Next implements caching in several locations. Can lead to unexpected behaviour in production mode.

1. Data Cache : Responses from requests made with 'fecth' are stored and used across requests
2. Router Cache : 'Soft' navigation between routes are cached in the browser and reused when a user revisits a page
3. Request Memoization : Make 2 or more 'GET' requests with 'fetch' during a user's request to your server ? Only one 'GET' is actually executed.
4. Full Route Cache : **At build time**, Next decides if your route is **static** or **dynamic**. If it is static, the page is rendred and the result is stored. In production, users are given this pre-rendered result.
