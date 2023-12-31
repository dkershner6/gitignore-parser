# GitIgnore Parser GitHub Action

GitHub Action to parse a .gitignore file for information. Generally, this is most useful when you are committing in your workflow, to ensure certain secret-containing files are not being committed.

This action uses the same .gitignore parser as eslint, prettier, and many others, and can be trusted for accuracy.

## Usage

### Inputs

| key | default | required | description |
|-----|---------|----------|-------------|
| path | `./` | false | The location of the .gitignore file from the repo root, with no filename. |
| must_deny | `''` | false | Comma-delimited string of files and paths the gitignore must deny being committed |
| must_accept | `''` | false | Comma-delimited string of files and paths the gitignore must accept being committed |
| fail_on_error | `'true'` | false | Boolean string ('true'/'false') to indicate whether the workflow should fail if a string in must_deny is not found |

### Outputs

Will exist on `${{ steps.[id].outputs.[key] }}`

| key | description |
|-----|-------------|
| requirements_met | Returns a boolean string ('true'/'false') representing whether all of the lines in must_deny were indeed denied, and all must_accept were accepted |
| not_denied | A Comma-delimited string containing all of the lines from must_deny that were not denied |
| not_accepted | A Comma-delimited string containing all of the lines from must_accept that were not accepted |

### Example Workflow

```yaml
on: pull_request

name: Run an action that commits

jobs:
  build:
    name: Create Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@master

      - name: Ensure .npmrc and .env are .gitignored
        id: gitignore-parser
        uses: dkershner6/gitignore-parser@v2
        with:
            must_deny: '.npmrc,.env'
      # Will fail if it doesn't deny either, but outputs are also present
      - name: Print whether .gitignore denies .npmrc and .env
        run: echo ${{ steps.gitignore-parser.outputs.requirements_met }}
```

## Contributing

All contributions are welcome, please open an issue or pull request.

To use this repository:
1. `npm i -g pnpm` (if don't have pnpm installed)
2. `pnpm i`
3. `npx projen` (this will ensure everything is setup correctly, and you can run this command at any time)
4. Good to make your changes!
5. You can run `npx projen build` at any time to build the project.