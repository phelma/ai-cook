This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## App Details

### Architecture

* Next JS v15
  * app router
  * server components
  * server actions
  * state management with mobx-state-tree
* Tailwind
* shadcn/ui
* Databases (coming later)
  * sqlite
  * drizzle orm
* Next js AI SDK
* Anthropic API for LLMs

### Recipe basics
This is an app for quickly picking a healthy meal.

The meals are based on 3 food types, haivng one of each

Protein
e.g. pan fried salmon, grilled chicken, fried beef steak,

Carbs
e.g . rice, pasta, potatoes,

Veggies
e.g. broccoli, carrots, spinach,

### Views

#### Ingredient picker

* User can set which ingredients they have available
* Can add new ingredients
* User can also specify other ingredients, e.g. salt, pepper
* User can specify equipment
* user can specify food allergies
* user can specify diet preferences
* user can specify units of measurement
* user can specify how many people they are cooking for
* user can specify ANY other requirements!!!!!!!

#### Recipe picker

* User picks 3 ingrediends
* Once the three ingredients have been picked, several AI generated suggestions for meals using them are shown
* User can pick a meal from the list to get the full recipe

Coming Later

* Slot machine style interface, with 3 spinning wheels, one for protein, one for carbs, one for veggies
* When the user clicks spin, the wheels stop on a random selection
* user is free to fix some of the selections and spin again
* they can also nudge through the options
* they are completely free to pick whatever they want, but the spinning makes it creative and fun