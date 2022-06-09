# web-app

<p align="center">
  <a href="" target="blank"><img src="./src/assets/logo.svg" width="320" alt="kreMES Logo" /></a>
</p>

## Production Build
```
docker build -f production.dockerfile -t zulfikar4568/web-app .
```

## Production Test
```
docker run -d --rm -it -p 8080:8080 --name prod_web-app zulfikar4568/web-app
```

## Interactive Terminal
```
docker exec -it prod_web-app /bin/sh
```