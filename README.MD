Venora UI — Stage 1 frontend skeleton

This folder contains a minimal Angular skeleton and Tailwind setup to get started.

Quick setup (recommended):

1. Install Angular CLI (if not installed):
   npm install -g @angular/cli

2. From this folder, install dependencies:
```bash
npm install
```

3. If you're creating a real Angular project instead of this skeleton, you can run:
```bash
ng new venora-ui --style=css --routing
```

4. Tailwind setup (if using CLI-created project):
```bash
npx tailwindcss init -p
# then update tailwind.config.js content paths and add @tailwind directives to styles.css
```

Run locally (after creating or completing the project):
```bash
npm start
```

Notes:
- This repository contains module folders (`src/app/auth`, `admin`, `owner`, `customer`, `shared`, `services`, `guards`) as placeholders for Stage 4.
- I will add new endpoints/routes to `postman/venora-api-collection.json` when backend APIs are added.
