
# Innoscripta Test Project

## Prerequisites
- Make sure you have [Docker installed](https://docs.docker.com/get-docker/) on your machine.
- After installing Docker, make sure it it running on your machine.

## Setup Guide

First, clone the project from GitHub:

```bash
git clone https://github.com/mrh-a/innoscripta-test-proj.git
```

Then you need to make sure you have the correct environment variables:
-In the "master" branch, make a copy of `.env.example` and rename it to `.env`
- Edit the `.env` as below:
  ```dotenv
  VITE_NEWS_API_ORG_API_KEY=429d8ab2220149e299d98d62d9605c4f
  VITE_NEWS_API_ORG_BASE_URL=https://newsapi.org/v2/top-headlines

  VITE_GURADIAN_API_KEY=504f3aca-8f7e-4d71-92ab-4abb17ef0d6c
  VITE_GURADIAN_BASE_URL=https://content.guardianapis.com

  VITE_NYTIMES_API_KEY=ucu0R4gl9vuPWBwoVVVnMdzAMj8d6ZKx
  VITE_NYTIMES_BASE_URL=https://api.nytimes.com/svc/search/v2/articlesearch.json
  ```

Next step is building the Docker image:
- Run the `docker build -t innoscripta-test-proj .` command in the terminal.

Final step is running the container:
- Run the `docker run -p 8080:80 innoscripta-test-proj` command in the terminal.

Open your browser and go to [http://localhost:8080](http://localhost:8080) to view the production version of the application.
