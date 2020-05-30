# GitIgnore Parser GitHub Action

GitHub Action to parse a .gitignore file for information. Generally, this is most useful when you are committing in your workflow, to ensure certain secret-containing files are not being committed.

## Usage

### Inputs

| key | default | required | description |
|-----|---------|----------|-------------|
| path | `./` | false | The location of the .gitignore file from the repo root, with no filename. |
| ignored_includes | `''` | false | Comma-delimited string of what the gitignore must include |
| fail_if_not_found | `'true'` | false | Boolean string ('true'/'false') to indicate whether the workflow should fail if a string in ignored_includes is not found |

### Outputs

Will exist on `${{ steps.[id].outputs.[key] }}`

| key | description |
|-----|-------------|
| gitignored | A Comma-delimited string containing all lines in gitignore |
| all_included | Returns a boolean string ('true'/'false') representing whether all of the lines in ignored_includes were indeed included |
| lines_not_included | A Comma-delimited string containing all of the lines from ignored_includes that were not included |

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
        uses: dkershner6/gitignore-parser@v1
        with:
            ignored_includes: '.npmrc,.env'
      # Will fail if it doesn't contain either, but outputs are also present
      - name: Print whether .gitignore contains .npmrc and .env
        run: echo ${{ steps.gitignore-parser.outputs.all_included }}
```