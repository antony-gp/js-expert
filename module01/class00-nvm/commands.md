Install specified version:

```bash
nvm install 20
```

Install long-term support version (recommended):

```bash
nvm install --lts
```

List all installed versions:

```bash
nvm list
```

Select specified version (intalled):

```bash
nvm use 18
```

Define specified version as default:

```bash
nvm alias default 18
```

Save current version being used to `.nvmrc`:

```bash
node -v > .nvmrc
```

Use version from `.nvmrc` on current directory:

```bash
nvm use
```
