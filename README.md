# Weather-app

Final project for Docker course. The project was cloned from https://github.com/eficode/weatherapp and then some changes were made. In this version of the app the user can search for any  city's weather by typing in the city. Also Dockerfiles for both frontend and backend applications are provided for docker image building. Also docker-compose.yml is provided for docker-compose workflow.



### Prerequisites

You'll need Docker
### How does it work
#### Building images

Clone the project, navigate to frontend and backend folders in your CLI and run: 
```
docker build -t <nameyouwannagiveforimage>:<tag> .
```
in order to build the docker images

## Deployment
You can deploy application to kubernetes.
First let's install Kubernetes on Ubuntu: 
```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg |sudo apt-key add -
sudo touch/etc/apt/sources.list.d/kubernetes.list
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update 
sudo apt-get install-y kubectl socat

```
start minikube virtual machnine.
```
sudo minikube start --vm-driver=none
```
Access dashboard by running:
```
sudo minikube dashboard
kubectl port-forward -n kubernetes-dashboard service/kubernetes-dashboard --address 0.0.0.0 <port>:80

```

Deploy to kubernetes with commands:
```
kubectl run <nameyourservicehere> --image=<image-name>:<image-tag>
kubectl expose deployment <name> --type=NodePort --port <port>
kubectl port-forward service/<name> --address 0.0.0.0 <port>:<external-port>
```
If you want to make changes to the application and deploy the changes, simply build a new image and set the image for your kubernetes service by running:
```
kubectl set image deployment/<servicename>   servicename=<image>:<tag> 
```



