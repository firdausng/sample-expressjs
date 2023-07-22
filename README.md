# sample express project
this project is sample expressjs project with google auth and jwt token

## Prerequisites
* Docker
* update `.env` file following the `.env-example` file

## Install Dependencies
* Run `npm install` in root of the repo.
* Run `npm install` in `./packages/services/dispatcher`.

## Run
```
docker-compose up -d
npm start 
```

## Deploy
* Ensure that your wrangler cli is pointing at the correct account.
* Change the domain names of each workers in the `wrangler.toml` file, e.g.:
    ```
    routes = [
        { pattern = "sitecore.facetpricing.com/*", zone_id = "bde1803e4927ab16b21e847c2f47254e" }
    ]
    ```
* Run `npx lerna run deploy` to deploy all the workers.
