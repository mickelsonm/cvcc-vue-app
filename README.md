## CVCC Vue Ap

Vue.js application the makes API calls against our go service.

#### Running Locally

Fetch dependencies

```
> npm i
```

Run the server

```
> go run main.go
```

View in all it's glory

```
> open http://localhost:3030
```


#### Deploying to Kubernetes

Build the Docker image

```
> docker built -t cvcc-vue-app .
```

Start the Kubernetes Deployment and Service

```
> kubectl create -f app.deployment.json
> kubectl create -f app.service.json
```