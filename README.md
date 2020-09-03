# Cue

Cue is a Discord bot, what sets it apart from the rest is that commands, and events can be created in a _block like_ structure, allowing users to create their own commands and logic with as much customization as possible.

## Client

### Sample ENV

```
VUE_APP_DISCORD_CLIENT_ID=
```

### To Run

```bash
# Move into the client directory.
$ cd client

# Install all of the required NPM packages.
$ npm install

# Start the Vue development server on port 8080.
$ npm run serve
```

## Server

### Sample ENV

```
NODE_ENV=development
PORT=

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

MONGO_URI=
JWT_SECRET=
```

### To Run

```bash
# Move into the server directory.
$ cd client

# Install all of the required NPM packages.
$ npm install

# Start the express development server on port 8081.
$ npm run dev
```
