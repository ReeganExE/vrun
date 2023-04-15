## vrun - A simple command for executing npm scripts simultaneously


### Usage

```
npx vrun npm-script1 npm-script2 ...
```

Or install it

```
npm install vrun -D
```

```yml
"scripts": {
  "start": "vrun build serve",
  "build": "build ...",
  "serve": "serve ...",
  "test": "echo 'No test' && exit 1"
},
```

It uses `child_process.spawn` to initiate npm commands. There's nothing magic.
Just a few lines of code. So you can create a script yourself without this package.

# LICENSE
MIT ©Ninh Pham
