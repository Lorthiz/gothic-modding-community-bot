# Gothic Modding Community Discord BOT

## Env

To start a project locally you will need `.env` file placed in the root of the repository. Supported values:

```dotenv
#Your BOT token from registered Discord App/BOT 
BOT_TOKEN="XXX"
#With what symbols/text should BOT messages be prefixed. Default '!'
BOT_PREFIX="!"
```

## Starting locally

Run those commands:

```
npm install
npm run start
```

> [!IMPORTANT]  
> But remember you need a valid `BOT_TOKEN` in your `.env` file!


## Commands

### gmc <payload>

This command looks up SearchIndex and finds most fitting article by user `payload`

Example:

```
!gmc meshes
```

### ref

GMC search index is cached for one full day, if cache would need to be refreshed sooner this command will invalidate
cache

Example:

```
!ref
```

## How to run bot in Docker
Using `docker run`:
```shell
docker run \
    -e BOT_TOKEN="<YOUR_TOKEN>" \
    --restart unless-stopped \
    lorthiz/gothic-modding-community-bot:latest
```
Using `docker compose`:
```yaml
---
services:
  gmc-bot:
    image: lorthiz/gothic-modding-community-bot:latest
    environment:
      - BOT_TOKEN=<YOUR_TOKEN>
    restart: unless-stopped
```



