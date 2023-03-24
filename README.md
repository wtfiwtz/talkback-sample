Mocking HTTP with `talkback` (Node.js) and `vcr` (Rails)
========================================================

In the Ruby on Rails world, back-end testing usually includes mocking out HTTP/S services. The `vcr` gem is pretty commonly used for this.

Why?
- No external dependencies _(e.g. Instagram API was notoriously unreliable)_
- More accurate tests compared to manually-created mocks
- Faster tests (less latency)

Why not?
- Sometimes we want to know when the external system fails or the HTTP interface changes - e.g. integration or e2e testing
- Updating the captured 'tapes' or 'vcr recordings' can be a little annoying, but they only change infrequently.
- Slightly slower to start / stop test suite


See the different branches:
- `without-talkback` - https://github.com/wtfiwtz/talkback-sample/tree/without-talkback
- `with-talkback` - https://github.com/wtfiwtz/talkback-sample/tree/with-talkback
- `rails` - https://github.com/wtfiwtz/talkback-sample/tree/rails


---------------

Steps to create this sample (Node.js)
-------------------------------------

```sh
npm init

  package name: (server) test-server
  version: (1.0.0)
  description:
  entry point: (index.js) => dist/index.js
  test command:
  git repository:
  keywords:
  author:
  license: (ISC)


npm install express dotenv
npm install -D typescript concurrently nodemon eslint jest jest-environment-jsdom ts-node ts-jest @types/express @types/node @types/jest @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
npm audit --fix # if necessary
npx tsc --init

npx eslint --init

  Ok to proceed? (y) y
  ✔ How would you like to use ESLint? · style
  ✔ What type of modules does your project use? · esm
  ✔ Which framework does your project use? · react
  ✔ Does your project use TypeScript? · No / Yes
  ✔ Where does your code run? · browser
  ✔ How would you like to define a style for your project? · guide
  ✔ Which style guide do you want to follow? · standard-with-typescript
  ✔ What format do you want your config file to be in? · JavaScript
  Checking peerDependencies of eslint-config-standard-with-typescript@latest
  The config that you've selected requires the following dependencies:
  ...
```

Other options:
```sh
npx create-react-app sample-app --template must-have-libraries # Needs python 2, possibly breaks on M1 hardware
yarn create react-app sample-app --template typescript
npx create-next-app@latest sample-app --use-npm
```

Helpful Articles:
- React / Node.js - https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
- Next.js - https://nextjs.org/learn/basics/create-nextjs-app/setup
- With Typescript - https://blog.logrocket.com/how-to-set-up-node-typescript-express/




---------------

Steps the create this sample (Ruby on Rails)
--------------------------------------------

First, install RVM or another ruby version manager:
https://rvm.io/rvm/install

```sh
rvm install 3.1.2
rvm use 3.1.2
gem install rails
rails new vcr-sample --skip-javascript --skip-test --database=sqlite3

# Add 'rspec' to 'Gemfile'
bundle install # or `bundle update`
rails generate rspec:install
```