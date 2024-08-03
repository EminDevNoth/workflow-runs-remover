# Delete workflow runs

This GitHub Action is specifically designed to manage and clean up workflow runs
in a GitHub repository. It provides a powerful tool for developers and project
maintainers to automatically delete old or unnecessary workflow runs, helping to
keep repositories organized and reduce clutter.

## Usage

By default, this action operates on all workflow runs within a repository. This
means that it will target and potentially delete every workflow run in the
repository, unless otherwise specified via filters.

```yml
name: Cleanup Workflow Runs

on: workflow_dispatch

# REMOVE IF THE TOKEN YOU ARE USING ALREADY HAS THESE PERMISSIONS
permissions:
  actions: write
  contents: read

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Delete Workflow Runs
        uses: EminDevNoth/delete-workflow-runs@v1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Filtering Capability

This action provides the ability to target a specific group of workflow runs
through filters. A filter allows you to specify exactly which workflow run
should be targeted for deletion, providing fine-grained control over the cleanup
process.

A filter is composed of one or more criteria, such as the conclusion of the
workflow run (e.g. success, failure), which allows for complex and flexible
filtering options. You can combine different criteria to create precise rules
for selecting workflow runs to delete.

For example,you might want to delete all **failed** runs that occurred **a week
or more** ago.

```yml
steps:
  - name: Delete Workflow Runs
    uses: EminDevNoth/delete-workflow-runs@v1.0.0
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      # JSON VALUE
      filters: '[{ "conclusions": ["failure"], "age": 7 }]'
```

It is possible to use multiple filters at the same time, allowing to target
different groups of workflow runs at once, without having to reuse this action
multiple times

For example, you might want to delete all **failed** and **skipped** runs, but
also all **successful** runs that occurred **60 days or more** ago.

```yml
steps:
  - name: Delete Workflow Runs
    uses: EminDevNoth/delete-workflow-runs@v1.0.0
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      filters: |
        [
          { "conclusions": ["failure", "skipped"] },
          { "conclusions": ["success"], "age": 60 }
        ]
```

> [!IMPORTANT]
>
> The order of the filters is important, a workflow run will be deleted at the
> first filter matching its criteria

## Filter options

You can further refine the result of your filtering by using the property
`options` of a filter, the latter allows you to impact the behavior of a
criterion and therefore change the result at the end

For example, let's say we want to delete all **successful** runs for all
branches **except** the branches **main** and **prod**.

```yml
steps:
  - name: Delete Workflow Runs
    uses: EminDevNoth/delete-workflow-runs@v1.0.0
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      filters: |
        [
          {
            "conclusions": ["success"],
            "branches": ["main", "prod"],
            "options": {
              "branches": "exclude"
            }
          }
        ]
```

### Syntax

```js
{
  criterionName: criteriaValue,
  options: {
    criterionName: criterionOption
  }
}
```

## Filter criteria

Below is a list of possible criteria to use in a filter with their options.

#### `conclusions`

List of conclusions to target

- **Type**: `string[]`
- **Options**:
  - `include`: target all runs with the specified conclusions.
  - `exclude`: target all runs that do not have the specified conclusions.
- **Default option** : `include`

##### Examples

```js
// Delete all runs with "failure" or "skipped" as conclusions
{
  "conclusions": ["failure", "skipped"],
}

// Delete all runs except those with "failure" or "skipped" as conclusions
{
  "conclusions": ["failure", "skipped"],
  "options": {
    "conclusions": "exclude"
  }
}
```

#### `branches`

List of branch names to target

- **Type**: `string[]`
- **Options**:
  - `include`: Target all runs associated with the specified branches name.
  - `exclude`: Target all runs that are not associated with the specified
    branches name.
- **Default option** : `include`

##### Examples

```js
// Delete all runs that are associated with the branches 'main' or 'prod'
{
  "branches": ["main", "prod"],
}

// Delete all runs that are not associated with the branches "main" or "prod"
{
  "branches": ["main", "prod"],
  "options": {
    "branches": "exclude"
  }
}
```

#### `age`

Number of days since the workflow run was created

- **Type**: `number|string`
- **Options**:
  - `>`: Target all runs that are older than the specified number of days.
  - `>=`: Targets all runs that are equal to or older than the specified number
    of days.
  - `=`: Target all runs that have an age equal to the specified number of days.
  - `<=`: Targets all runs that have an age equal to or less than the specified
    number of days.
  - `<`: Target all runs that are less than the specified number of days old.
- **Default option** : `>=`

##### Examples

```js
// Delete all runs that were created 15 days or more ago. (15, 16, 17 ...)
{
  "age": 15,
}

// Delete all runs created more than 15 days ago. (16, 17, 18,...)
{
  "age": 15,
  "options": {
    "age": ">"
  }
}

// Delete all runs created exactly 15 days ago. (15)
{
  "age": 15,
  "options": {
    "age": "="
  }
}

// Delete all runs created less than 15 days ago. (0, 1 ... 14)
{
  "age": 15,
  "options": {
    "age": "<"
  }
}

// Delete all runs created 15 days ago or less. (0, 1 ... 15)
{
  "age": 15,
  "options": {
    "age": "<="
  }
}
```
