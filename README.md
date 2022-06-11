# ApeJobs

## Table of Contents
- [Overview](#overview)
- [Deployment](#deployment)
- [Usage](#usage)
- [How To Run](#how-to-run)
- [Dependencies](#dependencies)

## Overview
ApeJobs is a job application platform for UCR students and professors Professors can list jobs relating to their courses or interests, such as research, TA, and grader positions. Students are able to apply for these jobs with one central profile connected to their UCR Google accounts.

## Team
<a href="https://github.com/Alexk21323">Alex Kuang </a>   
<a href="https://github.com/Moltenfuzzy">Kent Phan </a>   
<a href="https://github.com/Park-Ryan">Ryan Park  </a>   
<a href="https://github.com/gobrien06">Gabrielle O'Brien  </a>   

## Deployment
ApeJobs is deployed with Heroku at the following url:    
https://apejobs.herokuapp.com   

## Usage
Professor Profile/Home Page   
<img width="1423" alt="Screen Shot 2022-06-06 at 8 00 57 PM" src="https://user-images.githubusercontent.com/43893085/172287090-df9230b0-f305-4e9e-a69b-28c368060bdf.png">

Professor Create Listing Page   
<img width="1423" alt="Screen Shot 2022-06-06 at 8 00 28 PM" src="https://user-images.githubusercontent.com/43893085/172287120-f7a93d53-e45e-4fa8-af6d-9f4619674ab7.png">

Professor Job Listing Page   
<img width="1423" alt="Screen Shot 2022-06-06 at 8 01 01 PM" src="https://user-images.githubusercontent.com/43893085/172287052-4fb882bd-99e6-4121-b7ea-0cbcf3f18688.png">

Professor Application Page
![image](https://user-images.githubusercontent.com/46156230/172455696-8107e706-92dc-463f-974f-57cd39293f51.png)

Student Home Page
![image](https://user-images.githubusercontent.com/46156230/172455978-ceceafbc-49da-412a-b2f5-752f96023427.png)

Student Profile Page
![image](https://user-images.githubusercontent.com/46156230/172455995-30fd1af3-1217-4ad2-9907-f8c080a072aa.png)

Student Application Page
![image](https://user-images.githubusercontent.com/46156230/172456050-44867385-12a9-4284-90af-57a5ef2aef98.png)
![image](https://user-images.githubusercontent.com/46156230/172456060-1ba189af-f1c8-4f48-a191-4102c3061e12.png)
![image](https://user-images.githubusercontent.com/46156230/172456073-5975182e-5016-4c53-af8e-0cbec6d5c741.png)

Student Application Status Page
![image](https://user-images.githubusercontent.com/46156230/172456108-ca774635-ce0e-42e5-8e0b-8f2574fcfca0.png)

## How To Run
In the project directory, you can run:   

### `npm install`
Installs needed packages.<br />   

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Dependencies   
Install Node Package Manager (npm). [Helpful Documentation](https://www.npmjs.com/get-npm)  
### Backend
- google-auth-library   
- jsonwebtoken
- mongoose
- cookie-parser

### Frontend   
- react-google-login
- mui
- motion
- axios
- tabler icons
- js-cookies

