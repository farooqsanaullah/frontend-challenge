# TodoWorkspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your remote caching setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/tnLGJtKWhJ)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve frontend-challenge
```

To create a production bundle:

```sh
npx nx build frontend-challenge
```

To see all available targets to run for a project, run:

```sh
npx nx show project frontend-challenge
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


# Todo App Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [User Interface](#user-interface)
4. [How to Use](#how-to-use)
5. [Technical Implementation](#technical-implementation)
6. [Local Setup](#local-setup)
7. [Troubleshooting](#troubleshooting)

## Introduction <a name="introduction"></a>

The Todo App is a modern, responsive web application designed to help users manage their tasks efficiently. It provides a clean and intuitive interface for creating, editing, and tracking todos with dates and times.

## Features <a name="features"></a>

### Core Functionality
- **Create Todos**: Add new tasks with title, date, and time
- **Edit Todos**: Modify existing tasks
- **Delete Todos**: Remove unwanted tasks with confirmation
- **Mark as Complete**: Toggle completion status of tasks
- **Duplicate Prevention**: Prevents creating duplicate todos with the same title, date, and time

### Organization and Filtering
- **Filter Options**: Filter todos by:
  - All todos
  - Active (incomplete) todos
  - Completed todos
  - Today's todos
- **Search**: Search todos by title
- **Pagination**: Navigate through todos with customizable items per page

### User Experience
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Form Validation**: Ensures todos have valid titles, dates, and times
- **Error Handling**: Displays user-friendly error messages
- **Animations**: Smooth transitions and animations for a polished feel

## User Interface <a name="user-interface"></a>

### Main Components

#### Todo Form
- **Title Input**: Enter the task title (3-50 characters, letters, numbers, and spaces only)
- **Date Picker**: Select a due date (must be today or in the future)
- **Time Picker**: Select a due time
- **Add Button**: Submit the new todo

#### Todo List
- **Todo Items**: Display of all todos matching current filters
- **Checkbox**: Toggle completion status
- **Edit Button**: Enter edit mode for a todo
- **Delete Button**: Remove a todo (with confirmation)

#### Filter Controls
- **Filter Buttons**: Quick access to different todo views
- **Items Per Page**: Dropdown to select how many todos to display per page
- **Search Box**: Filter todos by title text

#### Pagination
- **Page Numbers**: Navigate between pages of todos
- **Previous/Next Buttons**: Move one page at a time

### Modals and Dialogs
- **Error Dialog**: Displays validation errors or duplicate todo warnings
- **Delete Confirmation**: Confirms before permanently removing a todo

## How to Use <a name="how-to-use"></a>

### Creating a Todo
1. Enter a title in the "Title" field (must be at least 3 characters)
2. Select a date using the date picker
3. Select a time using the time picker
4. Click "Add Todo"

### Editing a Todo
1. Click the pencil icon on the todo you want to edit
2. Modify the title, date, or time as needed
3. Click "Save" to apply changes or "Cancel" to discard

### Completing a Todo
- Click the checkbox next to a todo to mark it as complete
- Click again to mark it as incomplete

### Deleting a Todo
1. Click the trash icon on the todo you want to delete
2. Confirm deletion in the confirmation dialog

### Filtering Todos
- Click "All" to see all todos
- Click "Active" to see incomplete todos
- Click "Completed" to see completed todos
- Click "Today" to see todos due today

### Searching
- Type in the search box to filter todos by title

### Pagination
- Select the number of items per page from the dropdown
- Use the pagination controls to navigate between pages
