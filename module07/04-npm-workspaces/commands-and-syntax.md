### Creating a workspace

```bash
npm init -w workspace-name -y --scope=@yourscope --include-workspace-root
```

### Installing packages for a workspace

```bash
npm i package-name -w workspace-name
```

### Installing packages for all workspaces

```bash
npm i package-name --workspaces
```

### Running commands of a workspace

```bash
npm run test -w workspace-name
```

### Publishing a workspace

```bash
npm publish -w workspace-name
```

### Publishing all workspaces

```bash
npm publish --workspaces
```
