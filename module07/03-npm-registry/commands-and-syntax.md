### Using Github packages

After linking your project to a `remote repository` and creating your `personal access token`, login using that same token as password

```bash
npm login --registry https://npm.pkg.github.com
```

You must then use `registry` property in `package.json`

```json
{
  "repository": {
    "type": "git",
    "url": "git@github.com:antony-gp/fluentsql.git"
  }
}
```

And publish it using

```bash
npm publish --registry https://npm.pkg.github.com
```

To avoid having to specify `registry` on each publish, you can add `publishConfig` property in `package.json`

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

Alternatively, you can set `registry` to a specific scope during login

```bash
npm login --scope=@yourscope --registry https://npm.pkg.github.com
```
