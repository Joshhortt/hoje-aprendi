16 December 2022

# Hoje Aprendi!

#### By _**Josh Hortt**_

version: 16/12/2022

## Description

This Application was developed for a local private school. It uses the portuguese language on the front-end.
It is Developed in React.js with a Supabase backend with a database.

So the goal of this application is basically to allow users to share new information that they probably didn't know about a certain course subject.

In this case the users are students, teachers and the school staff. Each of these resources in the list have a description text itself, then users also need to input a valid source (URL Link), whicH You can also see that each added information belongs to one of the 8 categories that you see in the sidebar, and once you click on one of these categories, let's say Teacher's Information (Informações do Formador), then the app will only display
what belong to that category, so basically it is filtering the list of shared informations by category.

Another feature is that you can vote on these shared resources, to let other people know that this Link is interesting or not.

All this data is actually real data. It comes from a real database, [Supabase](https://supabase.com/) that is hosted on a web server.

It looks like a very simple app but there's actually a lot going on there than it appears on the surface.
So I really hope that you like this small application and that you also enjoy this playful design.

## User Specifications

- In order to add a new resource you just need to click on Share (Partilhar), insert a description, insert a link and choose the category and then share the information with your collegues.

- For example, the user can write Google is the biggest browser in the world, while typing you can see that actually the amount of characters is limited by 200. As you type there, this number updates, after that you need to provide a trustworthy source.(URL), so you can just paste the google link there, and then of course, you need to choose the category, then click post (publicar), and there is your new info added.

- Other users are able to vote on these shared resources, just by clicking on one of the three options:
  (Interesting, Mindblowing and False).

## Hoje Aprendi 🎧 🔊 | [Live Link](https://hojeaprendi.netlify.app/)

## Technologies Used

- JavaScript
- React.js
- Supabase
- CSS-3
- Html5

## VS Code Extensions

- Prettier
- Live Server
- Auto Rename Tag
- Color Highlight
- One Monokai Theme

## VS Code Settings

- Settings → Default Formatter → Prettier Code Formatter
- Settings → Format On Save → Toggle ON
- Settings → Auto Save → onFocusChange

## Learning Context:

| No  | Context learn by doing this project...        |
| --- | --------------------------------------------- |
| 1   | Setup the Code Editor                         |
| 2   | Start structuring The HTML document           |
| 3   | Styling and creating Layouts with CSS         |
| 4   | Connect Online Database and API with Supabase |
| 5   | Use Javascript to load App data               |
| 6   | Implement React library into the project      |
| 7   | Create a Production Build                     |
| 8   | Deploy the App to Netlify Web server          |

<br/>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```
npx create-react-app hoje-aprendi
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### If you Fork or Download this project run:

```
npm install
```

> run this short command for installing updated packages... <br/>
> that listed inside dependencies { object } based on `package.json` file.

## NPM | Dependencies...

| No  | Package Installs                         | Use for...                                                    |
| --- | ---------------------------------------- | ------------------------------------------------------------- |
| 1   | npx create-react-app hoje-aprendi        | package runner tool that creates a frontend build pipeline    |
| 2   | npm install --save @supabase/supabase-js | Installs the Supabase library into your project               |
| 3   | npm run build                            | creates a build directory with a production build of your app |

## File Structure...

```
🟨
    hoje-aprendi
    |
    ├── public
    |   ├── index.html
    |   └── logo.png
    |
    ├── node-modules
    |
    ├── src
        ├── App.js
        ├── supabase.js
        ├── index.js
        └── style.css
🟨
```

## Setup/Installation Requirements

_Clone repository in a shell using the command_:<br/>
`git clone https://github.com/Joshhortt/hoje-aprendi`

## Known Bugs

_Due to time constraints the site may not scale perfectly on every device._

## Support and contact details

_If you have any questions or find any issues with this web-application, get in touch_.<br/>
_My email is: joshhortt@yahoo.com_

### License

_**MIT License** Copyright (c) 2023 Josh Hortt_

# Project Demo

<img src='https://i.ibb.co/LJDWZsN/Hoje-Aprendi-Full-min.png' />
