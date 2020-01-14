# graphql-board DEMO

## Demo

![demo.gif](./demo.gif)

## Skill Stack

- React
- create-react-app
- Typescript
- GraphQL
- apollo-server
- apollo-client
- MongoDB

## Running

### Server:

```bash
cd server
npm i
npm run dev
```

- HTTP GraphQL endpoint is available at: http://localhost:4000/

### Client:

```bash
cd client
npm i
npm run start
```

- URL: http://localhost:3000

### DB:

Environment: MacOS

```bash
$ brew tap mongodb/brew
$ brew install mongodb-community@4.2
$ brew services start mongodb-community@4.2

$ mongo
$ > use graphql-board
$ > db.createCollection("board")
```
