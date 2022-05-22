# web-app

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