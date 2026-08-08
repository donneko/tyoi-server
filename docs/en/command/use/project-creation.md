# Create a project

## Create one in a new directory

```bash
tyoi create my-app --template basic-ts
cd my-app
npm install
npm run dev
```

`create` creates `my-app/` in the current directory. If a directory with the same name already exists, the command fails without overwriting it.

## Create one in the current directory

```bash
mkdir my-app
cd my-app
tyoi init my-app --template basic-ts
npm install
npm run dev
```

`init` copies the template into the current directory without creating a child directory.

## Choose interactively

If you omit the project name or template, the CLI prompts you to enter or select one.

```bash
tyoi create
tyoi init
```

## Add only a configuration file

You can add `tyoi.config.js` to an existing project.

```bash
tyoi config my-app --template basic
```

Currently, `basic` is the only configuration template.
