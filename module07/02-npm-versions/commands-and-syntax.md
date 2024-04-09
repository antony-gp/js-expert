# Your library

### Updating package versions

This will follow the `major.minor.patch` parttern

> **_Ex.:_** If our package is at version `2.4.6`
>
> ```bash
> npm version patch
> ```
>
> - _Would change version to `2.4.7`_
>
> ```bash
> npm version minor
> ```
>
> - _Would change version to `2.5.0`_
>
> ```bash
> npm version major
> ```
>
> - _Would change version to `3.0.0`_
>
> </br> To submit the changes, run
>
> ```bash
> npm publish
> ```

# Third party libraries

### Install

Uses `package.json` to get packages

```bash
npm i
```

#### In `package.json`

- Use `^` before version to grab the **latest** `minor` and `patch` for specified `major`

- Use `~` before version to grab the **latest** `patch` for specified `minor`

- Use `>`, `<`, `=`, `>=` or `<=` before versions for comparisons, or `-` between two versions to specify an inclusive range

- Use `||` to combine multiple sets of versions

### Clean install

Uses `package-lock.json` to get packages at specific versions

```bash
npm ci
```

### Checking outdated versions

```bash
npm outdated
```

### Updating package versions

To update `minors` and `patches`, you can run:

```bash
npm update
```

To update `majors`, you have to reinstall specified package(s) at desired version

```bash
npm i some-package@{version} another-package@{version}
```

- Using `latest` as version will grab the latest `major.minor.patch`
- You could also specify `major.minor.patch`
  - **_Ex.:_** `2`, `4.2.x`, `1.1.1`

This will update `package-lock.json`, and if using `npm i`, `package.json` will also be updated
