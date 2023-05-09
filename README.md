# The Complete React V8

## FrontEnd Masters

#### Teacher:

#### Repos:

- Course repo: https://github.com/btholt/complete-intro-to-react-v8
- Course examples repo: https://github.com/btholt/citr-v8-project

## 1. Pure React & createElement

## 2. Pure React Components

React has a concept of components called one-way data flow. Which basically means that i can pass data from app down to pet. i cannot pass data from pet up to app for the most part, let's say 99% of the time you don't.

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