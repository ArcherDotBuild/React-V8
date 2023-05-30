# The Complete React V8

## FrontEnd Masters

#### Teacher: Brian Holt

#### Course website:

https://react-v8.holt.courses/

#### Repos:

- Course repo: https://github.com/btholt/complete-intro-to-react-v8
- Course examples repo: https://github.com/btholt/citr-v8-project

## Section 01: Setup & Tooling

## 1. Pure React & createElement

## 2. Pure React Components

React has a concept of components called one-way data flow. Which basically means that i can pass data from app down to pet. i cannot pass data from pet up to app for the most part, let's say 99% of the time you don't.

## Folder 3

## 3. npm & Prettier Setup

`npm init -y`

Package.json is where i'm gonna start keeping all of my dependencies

`npm install --save-dev prettier@2.7.1` or `npm i -D prettier@2.7.1` --save-dev or -D is gonna save in the development dependencies

`npm install -D prettier` this will install whatever the lastest version of this

Settings + prettier + prettier required config + checkbox actived ☑️

Install Prettier VSCode extension

## 4. ESLint & Git Setup

ESlint it's just going to help us catch problems as we're going. Prettier catches all of your formatting problems, and ESLint is goint to catch very simply JavaScript problems.

Install ESLint microsoft VSCode extension

`npm i -D eslint@8.24.0`  
`npm i -D eslint-config-prettier@8.5.0`

To run the eslint inside the project directory:  
`npm run lint`

Here you can see what did it load, how did it load it, did i have any issues, it's very noisy
`npm run lint -- --debug`

## 5. Vite Setup

`npm i -D vite@3.1.4 @vitejs/plugin-react@2.1.0`

Vite insists that you call files JSX, or it will not do the JSX translation.
`npm i react@18.2.0 react-dom@18.2.0`

Vite has something that's called tree shaking (only includes code that you're actively using), which is another word for live code inclusion, which is different than dead code elimination (we'll go through and see if we can find things that are never called).

`"build": "vite build",`: So what preview does is, it runs Vite build, and then it shows you what Vite built for you.

`npm run dev`

## Section 02: Core Rect Concepts

## 6. JSX

We are writing JavaScript meant to imitate HTML. It'd be cool if your tools could just make the hops for us, and we get to describe what we want that is the principle behind JSX.

Self-closing tag it's optional in HTML, it is not optional in JSX, you must put that self-closing tag.

```jsx
// Valid JSX
<div />
<div></div>
```

## 7. Configuring ESLint & React

We need to give ESLint a hand to get it to recognize React and not yell about React not being used. Right now it thinks we're importing React and not using because it doesn't know what to do with React. Let's help it.

Run this: `npm install -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8`

## 8. setState Hook

#### How does React work? How does React know when to re render?

Every time when an event happens in JavaScript it re-renders everything, top to bottom.

These render functions are meant to be totally stateless. When i say stateless, it means that they're not modifying global.

So the way that you have state inside of a function, is you use these **React Hooks**. So these hooks are then passed into React and then React gives them back to you.

#### Couple of rules about hooks

They have to be called every single time in the same order. You can't have conditional creation of hooks, they have to be created every single time in the same order. Cuz the way that React is keeping track this is, this component calls these pieces of state in this order.

React Hook **useState**

```jsx
const [location, setLocation] = useState('')

// These three line are equivalent to the React Hook above
const locationHook = useState('')
const location = locationHook[0]
const setLocation = locationHook[1]
```

You can make your own custom hooks. all custom hooks are other hooks bundled together as one hook. So eventually, all custom hooks that you see, it's just calling a bunch of other hooks and they're bundling that into one more usable hook to use.

`npm install -D eslint-plugin-react-hooks@4.6.0` This is an official ESLint tool from the React team to make sure that you use hooks in a good way

## 9. Mapping Through Data with Hooks

```jsx
<label htmlFor='animal'>
  Animal
  <select
    id='animal'
    value={animal}
    onChange={(e) => setAnimal(e.target.value)}
  >
    <option />
    {ANIMALS.map((animal) => (
      <option key={animal}>{animal}</option>
    ))}
  </select>
</label>
```

## 10. Adding Animal Breed

```jsx
<label htmlFor='breed'>
  Breed
  <select
    id='breed'
    disabled={breeds.length === 0}
    value={breed}
    onChange={(e) => setBreed(e.target.value)}
  >
    <option />
    {breeds.map((breed) => (
      <option key={breed}>{breed}</option>
    ))}
  </select>
</label>
```

## 11. Effects

React Hook **useEffect**, And effect is basically something that's going to happen outside of your component, So i have my location, animal and breed. But then once I have those and user clicks Submit, I want that to go out to my API and get a new list of pets so that the user can see what they've searched for. That's what these effects are for. It's like go retrieve this from some other place or go do something outside of the life cycle of my component. So typically that's API requests.

An **Effect** runs, every single time, you re-render the application, so this is going to request the pets every single time i type, which is not what i want, i only want that on submit events.

```javascript
useEffect(() => {
  requestPets()
})
```

#### So how do we do that?

You can give it an array of dependencies. And here if i give it nothing, then it's only going to request once at the beginning and then it's never going to do it again, which is actually what i want. The only time after this that I want to call request pets is on submit, On the form submit, which so that puts the user in control of when this research is for things.

```javascript
useEffect(() => {
  requestPets()
}, [])
```

Every time that animal changes, I want you to rerun request pets. So now if i change animal, Now it's doing it every single time that i change this.

```javascript
useEffect(() => {
  requestPets()
}, [animal])
```

## 12. useBreedList Custom Hook

If you wanna do async await of an useEffect, you must create an async function inside of the useEffect.

```javascript
useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }

  }, [animal]);

  return [breedList, status]
}
```

The **status** in the useEffect, makes it really easy to test if you do it that way, you basically wait for that to become loaded and then you can write tests. And by tracking that status throughout the entire thing. So if you have a custom hook that is doing something that you have to wait on, I
would recommend tracking a status because then later when you go to do tests, it makes it very easy
to test.

## 13. Component Composition

https://legacy.reactjs.org/docs/events.html#supported-events

## 14. Styling the Pet Component

## 15. React Dev Tools

**Props** are read only, they come in as properties, if i modify the props, it doesn't modify what the parent is passing in. State is mutable, usestate and hooks and things like that.

## Section 03: React Capabilities

## 16. React Router v6

`npm install react-router-dom@6.4.1`

```javascript
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
;<BrowserRouter>
  <header>
    <Link to='/'>
      <h1>Adopt Me!</h1>
    </Link>
  </header>
  <Routes>
    <Route path='/details/:id' element={<Details />} />
    <Route path='/' element={<SearchParams />} />
  </Routes>
</BrowserRouter>
```

## 17. useParams

useParams gets the id from the browser router

```javascript
import { useParams } from 'react-router-dom'

const Details = () => {
  const { id } = useParams()

  return <h2>{id}</h2>
}

export default Details
```

## 18. React Query

The nice thing about React Query is it you're gonna start removing effects from your database cuz it's basically going to handle all your API requests for you.

Secrets to a long happy life with React:

- Minimize effects in your code
- If there's a library that can handle it for you, do that
- Where you have effects, try and contain them to small testable areas

**95% of use cases for useEffect is API request**

`npm i @tanstack/react-query@4.10.1`

There is a thought process we could have multiple query clients throughout your app, that maybe different parts of your app need to make requests to the same place and you don't want them to share a cache.

**React Query cache is stored in-memory**

## 19. Performance Optimization with React Query

## 20. Refactoring fetchBreedList

Mutations
Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, TanStack Query exports a **useMutation** hook.

https://tanstack.com/query/v4/docs/react/guides/mutations

## 21. Uncontrolled Forms

We could let the browser take care of it. And then we could just pull it out of the browser whenever we had a submit event, which we can.

#### FormData

Is a Browser API, you can feed it a form and it'll pull out all of the data on the form for you into an object.

```jsx
const formData = new FormData(e.target)
const obj = {
  animal: formData.get('animal') ?? '',
  breed: formData.get('breed') ?? '',
  location: formData.get('location') ?? '',
}
```

Now we're gonna have an obj which is gonna have the animal, the breed, and the location, which is gonna be the current state of the form.

## 22. Class Components

**State** is how you keep track of like internal state to a component. Basically, the same thing that you would use useState for.

## 23. Handling Events in Class Components

Everything that comes out of the DOM is a **string** all the time.

## Section 04: Special Case React Tools

## 24. Error Boundaries

## 25. Modals with Portals
