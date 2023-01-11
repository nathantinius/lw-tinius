# LifeWay Coding Challenge

### Clone this repo to your local machine and change into the directory.

`git clone https://github.com/nathantinius/lw-tinius.git` \
`cd lw-tinius`

### Install Redis Locally using Homebrew
`brew install redis` \
If homebrew is not installed: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
` \
Installing homebrew can take a few minutes.

Check Redis is running `brew services start redis` 

### Next start the Frontend and the Backend.
In two terminal windows run these commands \
Frontend: `cd frontend` `npm i` `npm run dev` \
Backend: `cd backend` `npm i` `npm start`

### Open on LocalHost: 
Click this link: http://localhost:3000 and use the App.

**NOTE:**  SWAPI can take a long time to respond to requests. This is causing a suboptimal user experience and is being resolved with a cache. However, the initial page load time can be LENGTHY.

### Potential Future Improvements: 
* Let users login to store their favorites in perpetuity
* Share favorite characters with other users 
* Create a filter by popularity.
* Alternatively store SWAPI data into a DB and call the DB from gateway API.
  - This would allow for a better querying system eliminating followup calls to the slow SWAPI.
  - This would also allow for some additional functionality -- such as giving each character a popularity score.

