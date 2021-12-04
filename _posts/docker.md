---
title: "An Introduction and Reference to Docker"
date: "2021-11-16"
excerpt: "Docker is an awesome tool for setting up and configuring servers. It's definitely the coolest tech thing to happen this decade. Here I go over cool things you can do with docker, and how to start using docker in your own project."
coverImage: '/assets/blog/docker/cover.jpg'
author:
  name: Humaid Khan
  picture: '/assets/blog/authors/hk2.jpeg'
ogImage:
  url: '/assets/blog/docker/cover.jpg'
categories: 
  - "coding"
tags: 
  - "coding"
  - "development"
  - "devops"
  - "docker"
  - "technology"
  - "tutorial"
---

Hi,

Welcome to my quiet little corner of the internet!

In this article, I'll be going over what is docker, some cool ways you can use it and how I use it.

- [Introduction](#Introduction-header)
- [Volumes](#volume-header)
- [Networks](#Network-header)
- [Dockerfile](#Dockerfile-header)
- [Compose](#Compose-header)
- [Commands Reference](#Commands-header)
- [Summary](#Summary-header)

## Introduction

Docker is a containerization tool. It allows developers to run their code in a pre-configured environment. It's basically a more simplified version of a Virtual Machine.  
  
Think of any code you've ever written. The first step is always downloading and installing lots of different software required to run your program. After that you need to change some configuration in your computer and then finally you'll be able to run your program.

Now suppose you had to share your code with a friend, he/she'll have to repeat the whole installation/configuration process and if they miss a step or mess up somewhere, it can take hours to fix. Wouldn't it be nice if we could somehow share our computer, that can run the program, with our friend or with anyone. That's exactly the problem Docker was made to solve.

Docker allows us to setup configuration files where we install some software on a chosen operating system, configure it, and then share it with other people. These configurations of an operating system are called "Docker Images". Docker images are just configuration that need to be run using Docker. When Docker runs these images, it spins up a "Docker container", which is a running instance of the image. You can think of Docker containers like VMs or mini-computers running within your computer.

> The most important use for docker is actually web server hosting. Being able to share your computer environment in a proper environment has made docker essential for small test projects to huge systems with complicated micro-services.

Anyway, enough talk, lets see all this in action with some cool examples.

Installing docker is easy now,

- For Mac, install [docker for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)
- For Linux,
    - pick your distribution from the left and [follow the instructions](https://docs.docker.com/engine/install/ubuntu/)
    - also install docker compose, from [here](https://docs.docker.com/compose/install/)
- For Windows, install [docker for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)

Alright, so for our first example lets try running an ubuntu docker container

```
docker container run --name my-ubuntu ubuntu
```

![](images/image-edited.png)

Running an ubuntu container

This command says run a new container, that has a name of my-ubuntu, using the ubuntu image. Since it doesn't find the ubuntu image on my computer, it download and caches the image.

Alright now if we list our containers, we should see a running ubuntu container.

To list all running containers, you can run:

```
docker container ls
```

![](images/image-1.png)

Huh? The ubuntu container isn't there?? Did it even run the container?  
Yes it did, but the way docker containers are designed, is that when there is no program is running, they stop and exit. So if we have a look at all containers(including the stopped containers):

```
docker container ls -a
```

![](images/image-2.png)

So here we see the container that we ran with the name "my-ubuntu" ran the bash command and then exited 14 minutes ago.

Every docker image has a default command that it runs when the container starts and for ubuntu that's the bash command. The way that the bash command works is that if no user is connected to the bash terminal, it will exit immediately. So we'll need to connect to the container as soon as we start it.

First lets cleanup:

```
docker container rm my-ubuntu
```

![](images/image-3.png)

This command deletes the container we created, freeing up any memory that was being used.

So to run the container while connecting the terminal:

```
docker container run --name my-ubuntu -it ubuntu
```

![](images/image-4.png)

And there you have it, a working ubuntu docker container. What changed? we added the -it flag, which combines -i (allows input in to the contianer) and -t (connect your computer terminal to the container terminal)

Awesome, if you've ever wanted to play around with an ubuntu terminal, here you go!

Lets try another cool example. lets say you want to quickly test write some javascript without installing anything, just run:

```
docker container run --name my-node -it node
```

![](images/image-5.png)

Here I've created a node container based on the docker node image and run some Javascript code. The node image is actually based off a linux image. It's kinda like you took a linux operating system and installed node on it. This means we can directly run bash on the node container:

```
docker container run --name my-node-bash -it node bash

npm install -g cool-ascii-faces

cool-face
```

![](images/image-6.png)

Here we chose to run the bash command as our container startup command instead of the default "node" command which the node image runs. Since we had access to a linux terminal with node installed, I was able to install and run an npm package called "cool-ascii-faces".

Lets do something even cooler, lets say you wanted to make a Wordpress blog just like the one you're reading right now.

```
docker run --name some-wordpress -p 8080:80 -d --name my-wordpress wordpress
```

![](images/image-7.png)

Open http://locahost:8080 in your browser

![](images/image-9.png)

Here we use the wordpress image, we also see 2 new flags, -d and -p. The -d flag is used to tell docker to run the container in the background with no terminal attached. The -p 8080:80 tells docker to map all the traffic from port 8080 in your computer to port 80 within the wordpress container. So when you visit the website localhost:8080, it sends a request to port 80 within the wordpress container which loads up the wordpress website.

Cool right, Now you can configure your own wordpress website.

To stop your container

![](images/image-11.png)

Here we list the running container to ensure the wordpress container is running. Then, we stop the container using the stop command. Also remember to cleanup by removing your container using the docker container rm command. Note, you can use the hash or part of the hash of the container instead of the container name.

Alright so about now you must be wondering where I'm getting all these cool docker images and where you can find more images.

The go to place for docker images is [https://hub.docker.com/](https://hub.docker.com/)

Docker automatically pulls images from, docker hub, which is a "docker registry". Go ahead and try out some images from there. Each image has a bunch of tags/versions associated with it. Alpine tags are barebones and don't have many commands installed, based of the alpine linux os, they're usually used to host websites where you want to save memory on your docker machine. Whereas, the stretch or normal versions/tags have a lot of normal linux commands. By default, docker loads the latest tag/version, which is what we have been using so far.

One more insanely cool example is nextcloud, it's an image that allows you set up your machine as cloud storage. Basically if you have some extra computer at home or just an extra external storage+raspberry pi. You could build your own cloud storage and give your friends, family access to it if they're on the same wifi.I'll leave it to you to find and try out on [dockerhub](http://dockerhub).

## Volumes: Persisting data in docker containers

Docker containers may seem like their own mini-computers but remember, they're just processes that are running on your machine. They don't store any information, but for server hosting, we really need to be able to store information, especially for database services like mysql or mongo whose whole purpose is store persisted data.

So to persist this data, docker gives us two options for persisting data:

1. Volumes, which are basically docker managed files that are secure, easy to migrate, and have great performance. These are perfect for storing data, because they aren't accessible from the host machine(your machine), they are only accessible from the container. This is what databases images like mongodb or mysql use.
2. Bind Mounts, which link a directory(folder) in your computer with a folder in your docker container. These are perfect for development, since in dev, we usually have file watchers such as nodemon or webpack(react) that listen refresh on file changes. So suppose you edit a file, the bind mount copies the new changes within the container, nodemon restarts your server and poof, your new changes are live.

You can create and manage volumes similar to containers

```
docker volume create ubu-vol

docker volume ls
```

To attach the volume, when starting a container run

```
docker run -d --name <container-name> -v <volume-name>:<directory-where-volume-is-located> <image-to-be-run>
```

```
docker run --name myubu -v -it ubu-vol:/home/ubuFolder ubuntu
```

Now I can save files in the /home/ubuFolder directory and the next time I create a container, I can mount that volume anywhere I like, e.g. in the /usr directory.

If I want to delete the folder, I can run

```
docker volume rm ubu-vol
```

![](images/Screen-Shot-2021-08-13-at-2.03.54-PM.png)

Example of volume persisting data

To create a bind, you can run:

```
docker run -it --name <container-name> -v <host-directory>:<container-directory> <image-name>
```

```
docker run -it --name myubu -v "$(pwd)":/home/ubuFolder ubuntu
```

^Here I've used the pwd command to bind mount the current directory to the ubuFolder, that means all the files in my current directory will be copied in the container and vice versa.  

![](images/Screen-Shot-2021-08-13-at-2.11.55-PM.png)

Example of bind mounting a directory

## Networks: container-to-container communication

Now that we know about volumes and bind-mounts, we can share data between our host computer and the docker container, but what if we want our containers to talk to each other. For example, a classic example is a server talking storing data in database. We would need to somehow have them on the same network. That's where docker networks come in, docker networks allow us to connect and communicate between docker containers.

There are four types of networks in docker:

1. Bridge networks, these are used when you need inter-container communication in a single host(computer).
2. Host networks, these are used when you want to connect your computer to the docker containers. Any container connected to a host network is also connected and accessible from your host computer.
3. Overlay networks, these are used when you need inter-container communication across multiple hosts(computers).
4. macvlan, these provide mac addresses to the docker container. Helpful for moving legacy systems to move to docker containers.
5. none, If you want to completely isolate your container from other networks, you can the container with a network mode of none.

Here, I'm only going to cover Bridge networks in detail as they are the most used and could get quite complicated. Check out the documentation, if you want to know more about them. [https://docs.docker.com/network/overlay/](https://docs.docker.com/network/overlay/)

By default, when creating docker containers, they get directly connected to a default bridge network.

Lets create a new container:

```
docker container run -d -it --name testubu ubuntu bash
```

![](images/Screen-Shot-2021-08-21-at-9.29.09-PM.png)

Next we list our current networks  

```
docker network ls
```

![](images/Screen-Shot-2021-08-21-at-9.30.02-PM.png)

Now if we inspect the default bridge network named "bridge".

```
docker network inspect bridge
```

![](images/Screen-Shot-2021-08-21-at-9.32.17-PM.png)

Here we can see the container we created, "testubu" which is connected to the bridge network with ip address 172.17.0.2.

The default bridge network is great but it doesn't have DNS(Domain name system) support. That means that if you want to access a container from another container, you would need to find the ip address for every container. This is fine for quick testing servers using curl or running any other command against a container.

Let me show you this in action. I'm gonna start up another container an nginx container. Nginx is a fast server that's mostly used for routing, providing https certificates, and static file hosting.

![](images/Screen-Shot-2021-10-09-at-4.45.00-PM.png)

By default, nginx hosts a website on port 80. We can see that the image is exposing port 80 above. Now if we inspect our bridge network

![](images/Screen-Shot-2021-10-09-at-4.51.49-PM.png)

You can see that both are connected to the same network with a different ip address testubu is at 172.17.0.2 and testnginx is at 172.17.0.3.

Next, lets jump into the testubu container

```
docker container exec -it testubu bash
```

Update the packages and install curl. Curl is a small command line tool for doing http requests, basically it gets you the html for any website

```
apt-get update
apt-get install curl
```

You can try it out by running curl to google.com

```
curl www.google.com
```

![](images/Screen-Shot-2021-10-09-at-10.26.50-AM.png)

Now lets try to curl the server we just created testnginx.

```
curl testnginx
```

![](images/Screen-Shot-2021-10-09-at-4.53.45-PM.png)

It says that it has no idea what you're talking about, let's try the ip address of testnginx we got from docker network inspect earlier.

![](images/Screen-Shot-2021-10-09-at-4.55.28-PM.png)

We got the website that is being served by nginx. Pretty cool that the 2 "computers" were able to talk to each other.

Generally, using ip addresses is a bad idea as ips could change due to a container restart or if the network went down.

So, Docker provides us with a better solution, creating custom bridge networks. If you create your own docker network and connect your containers to it, docker provides dns resolutions. This will resolve name container to the appropriate ip automatically and so you just need to know your container name to do requests to the other containers,

```
docker network create --driver bridge mynetwork
```

Next lets connect our containers to the nework

```
docker network connect mynetwork testubu
docker network connect mynetwork testnginx
```

Alright, we can inspect the network to make sure they're connected

![](images/Screen-Shot-2021-10-09-at-5.05.08-PM.png)

Now, if we jump into the ubuntu container and run curl to the nginx container name, it'll automatically translate the name to an ip and get us the result of the request.

![](images/Screen-Shot-2021-10-09-at-5.06.10-PM.png)

## Dockerfile: Building your own images

Alright so we have an idea of containers, networks, volumes. I'm sure though you're starting to find typing the long commands annoying every single time you want to start a container. That's where dockerfiles come in. Dockerfiles are used to create your own custom docker images with pre-installed programs and environments.

Like above, when we were testing nginx, we had to go into the container, update the packages, and then install curl manually. If we were to start a new ubuntu container, we'd have to re-do all that every single time. So let's create some test files for our image, create a new folder, and put some text in a new test.txt file.

```
mkdir myNewUbuntu
cd myNewUbuntu
echo '' > Dockerfile
echo 'Hello World!' > test.txt
```

Make sure the name of the Dockerfile is 'Dockerfile' with no extension. Now copy over the code below to the Dockerfile and let me explain what it does.

```
FROM ubuntu

EXPOSE 8080

COPY ./test.txt /home/

RUN apt-get -y update
RUN apt-get -y install curl

WORKDIR /home
RUN echo Hi > test2.txt


CMD ["bash"]
```

Let's say you had a project that you want to write a docker image for. The concept is copy your source files into this pre-configured docker container, install any project specific dependencies, and run the project.

Custom images are based on existing images. To specify which image to base off of, we use the keyword FROM, followed by the image name.

Now that we've told docker that we want to base our image of the ubuntu image, the next keyword that we use is EXPOSE. Expose exposes in any port in our container allowing traffic to flow in/out to the container.

Next is the COPY directive, the copy command copies files from the host directory to the container directory. Remember that host computer doesn't necessarily mean your computer, your image could run on any computer. The copy directive is great for copying your source files to the container. It's the equivalent of copy pasting the files into the container, there's no connection being held with the host computer (not like bind mounting).

So that's where the next RUN directive comes in, we use the RUN command to run any commands within the container. Here we've used it to update the packages in the container and install curl.

Next we use the WORKDIR directive to set the the current directory and the directory which we'll be at when we enter the container later on. Just to show that, I've created a test2.txt with the message 'Hi' inside.

Finally, we set the command to be run every time the container starts/restarts to be bash using the CMD directive.

Alright now to build an image from this dockerfile, we run the following command

```
docker image build -t <image-name> .
```

Note: the image name needs to be lowercase and we've specified the current directory as where the dockerfile is and be built from using the dot .

![](images/Screen-Shot-2021-10-22-at-2.09.58-PM.png)

Now we can start the container,

```
docker container run --rm --name testubu -it mynewubuntu
```

Here I've used the --rm flag to automatically delete the container once we stop it and the -it to attach to the container so that it doesn't stop.

![](images/Screen-Shot-2021-10-22-at-2.13.04-PM.png)

So the first thing you notice here is that we start at the home directory and if we check the home directory, the test2.txt file was created and the test.txt was copied successfully.

If we check the container

```
docker container ls
```

![](images/Screen-Shot-2021-10-22-at-3.26.30-PM.png)

We notice the ports have been exposed and the bash command is set as the default command of the container.

Cool, so we've made our first image and it should be useable by everyone. All they would have to do is clone or copy the source files and run the image using the run command above. No installation or setup or configuration necessary.

### Sharing the Image

To share this image with your team members, you could provide the image through github or sending them the dockerfile directly, but this would mean that they would have to rebuild the image every time you make any changes. To separate the build process and make it easier to share your image with others, you could push your image on to docker hub. Just go to their website, signup/signin, create a new repo and follow the commands they provide, your image name would be testubu in this case.

Docker Hub is a docker registry which means it stores, builds, and has hooks for when images are updated. You could build your own registry or use other ones, but that's beyond this article.

## Compose: Putting all together

Alright so docker images help us configure and setup containers in an organized manner. But when you have multiple images that need to be run and connected together with different networks, we'd still need to type a lot of commands and keep in mind, the differences. To solve this inter-container communication problem, docker provides us with docker-compose. docker-compose is a file that can be used to configure multiple images and networks to control how they communicate.

So to better your understanding and putting everything together. I'm gonna show you a real life example of a mini-example. We're gonna dockerize one of my existing projects. This was a really old project that I did for some weird recruiting website. It's supposed to be a socket-io implementation of [conway's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

[https://github.com/humaidk2/t1-conway](https://github.com/humaidk2/t1-conway)

So clone down the project

```
git clone https://github.com/humaidk2/t1-conway
```

As a first step, just try going in each of the client and server folders and running npm install and npm start. If you open up localhost:3000, you should see something like this

![](images/Screen-Shot-2021-10-28-at-2.23.25-AM.png)

Alright, so here's a challenge for you if you've been following along: **Create Dockerfiles for each of the client and server and get the project to run within containers.**

I'm gonna do something a little more, I'm gonna use nginx to hide the ip of the my server container.

My client Dockerfile looks like this

```
FROM node:14.18.1

EXPOSE 3000

ENV PORT=3000

WORKDIR /usr/home

COPY . .

RUN npm install

CMD ["npm", "start"]
```

Here I've used a node image, exposed some port, set the environment variables, set the initial directory. Next we copy all the code in the current folder(the client folder), we run npm install to generate node\_modules, and finally start the client. This is similar to the process of running the code on your own computer.

I've also created a .dockerignore file to prevent copying node\_modules into the container. Instead, we want to re-generate node\_modules using npm install. There's 2 reasons for this

- Copying is a heavy process and node\_modules is huge
- node\_modules depend on the target machine so they need to be generated inside the container.

Here's my .dockerignore file for the client:

```
node_modules
Dockerfile
compiled
```

Similarly, my server Dockerfile

```
FROM node:14.18.1

EXPOSE 8080

ENV PORT=8080

WORKDIR /usr/home

COPY . .

RUN npm install

CMD ["npm", "start"]
```

and my server .dockerignore file

```
node_modules
Dockerfile
```

For my nginx, I've created a new folder called nginx and used this super simple conf file:

```
server {
    listen 9000;

    location / {
        proxy_pass $CONWAY_SERVER;
    }
}
```

Here nginx is listening to port 9000 and forwarding all traffic to the environment variable $CONWAY\_SERVER. The Dockerfile for this nginx config is as follows:

```
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/mysite.template
EXPOSE 9000
CMD ["/bin/sh" , "-c" , "envsubst < /etc/nginx/conf.d/mysite.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
```

Here we used nginx as our base image, copied over the nginx.conf and run some command to allow us to substitute environment variables in nginx.

That takes care of all our containers. Now to run this, we'll need to build all three images and run them while port forwarding from the host. We'd also need to create a network that connects the nginx to the server while making sure all the names and ports are correct. It seems like a lot of things to remember and get working properly. This is where docker-compose comes in.

Docker-compose is kind of a runner that builds and runs all the images and puts them on one network. To use docker-compose, create a docker-compose.yml file in the root of the project folder and copy paste the following.

```
version: '2.4'
services:
    conway-frontend:
        build:
            context: ./client/
            dockerfile: Dockerfile
        ports: [8080:3000]
        environment:
            - PORT=3000
            - WEB_SOCKET_URL="localhost:9000"
        restart: always
    conway-backend:
        build:
            context: ./server/
            dockerfile: Dockerfile
        environment:
            - PORT=8080
        volumes:
            - ./server:/usr/home
        networks:
          - conway-network
        restart: always
    conway-nginx:
        build:
            context: ./nginx/
            dockerfile: Dockerfile
        ports: [9000:9000]
        networks:
          - conway-network
        environment:
          - CONWAY_SERVER=http://conway-backend:8080/
        restart: always
        depends_on: [conway-backend]
networks:
  conway-network:
```

Alright and to start all these containers run:

```
docker-compose up -d
```

Much easier to remember and type right??.

Let's go over the contents of the file. The first thing to notice is the version number is set to 2.4, docker-compose uses version 2.x, the reason I chose v2 is cause v3 had some stuff . Have a look here, [https://docs.docker.com/compose/compose-file/compose-versioning/#version-3](https://docs.docker.com/compose/compose-file/compose-versioning/#version-3) . Next thing on the list is the 'services' keyword and here we declare all the services that we're using. Any service included here will be used as part of the name of the container.

For each service, we define the image to be used. You could mention the name of the image from docker-hub, e.g. 'image: nginx', 'image: node'. Here I've chosen to build the images from the Dockerfiles from their respective directories.

The ports keyword is used to port forward the ports of the host machine to the container. Notice how it takes a list to add any additional ports to be forwarded, e.g. \[8080:3000, 5000:8000\]. You'll probably also start to notice that the options are very similar to when we were running the containers individually.

We can also list environment variables in the compose file, if we want to add additional fields or overwrite existing variables. Another feature that docker provides with is ip resolution of urls, so when I provide the url  "CONWAY\_SERVER=http://conway-backend:8080/ "as an environment variable, the ip of the container named conway-backend is automatically resolved to it's ip.

The restart:always directive is used to tell the container to create itself in case of any crashes. We can also tell containers to depend on each other to organize the order of containers to be started, e.g a server waiting for the database.

We can also define networks in compose files, here we've defined the "conway-network" that by default uses the bridge network. We can also connect containers to these defined networks using the "networks:" directive in each container.

Note, by default, all containers in a compose file are connected to a new bridge network. By defining and connecting to our own network, the container is only connected to this new defined network and not the default compose network.

Lastly, you may have noticed my use of bind mounts in the conway-backend container, "volumes: - ./server:/usr/home". The reason I added this is that compose is really nice if you want to quickly startup and shut down services together, but compose caches your built images. This is great for performance and restarting containers, but if you're developing your images, you would have to force recreate them using

```
docker-compose up -d --no-deps --build <service_name>
```

This is still not nice for every change to the code you make. That's where bind mounts are really awesome. They ensure the files inside the containers are in sync. If you run some watching application like nodemon that restarts with file changes, combined with bind mounts, the combination is awesome for development and quickly seeing your result in action. That's why, it's good idea to define separate compose files for development and for simply running the project(prod).

Alright so now that we have our compose file, we can easily start restart, and shut down all our services at once.

Try it out

Start/Restart:

```
docker-compose up -d
```

Note the -d is detached mode to allow us to run the services in the background.

Have a look at the containers running using

```
docker container ls
```

Shut down:

```
docker-compose down
```

Awesome right, just one line to remember, and we can run the most complex projects.

## Swarm/Kubernetes: Beyond

Swarm/Kubernetes are beyond this article, I'll give some a bit of intro to them.

As we've learned, docker-compose is nice for developing with multiple containers on one machine, but what if we want to run our containers on multiple machines. Think about any website, they obviously can't be limited by the memory of one machine. That's where container orchestrators come in, like swarm and kubernetes.

Swarm is really similar to compose, the difference is the file name it uses is stack.yml. It comes with a bunch of builtin features and pretty simple to use if you know compose. Note, that docker is kinda pushing more support for kubernetes.

Kubernetes is a little more "add what you need". It takes some setting up, but in terms of usage, it's really similar to docker itself.

At the end of the day, you add your containers to these orchestrators and they manage the resources appropriately.

## Commands Shortcut

I thought it would be nice to have a list to reference for docker commands:

- docker container ls
- docker container ls -a
- docker container run --name <container-name> ubuntu
- docker container run --name my-node -it node
- docker container rm <container-name>
- docker container exec -it <container-name> bash
- docker run --name some-wordpress -p 8080:80 -d --name my-wordpress wordpress
- docker run -d --name <container-name> -v <volume-name>:<directory> <image-name>
- docker run -it --name myubu -v "$(pwd)":/home/ubuFolder ubuntu
- docker container restart <container-name>

#### Network

- docker network ls
- docker network inspect bridge
- docker network create --driver bridge mynetwork
- docker network connect mynetwork testubu
- docker network disconnect mynetwork testubu
- docker network rm mynetwork

#### Image

- docker image build -t <image-name> .
- docker image ls
- docker image rm <image-name>
- docker image pull <image-name or url>
- FROM
- EXPOSE
- ENV
- WORKDIR
- COPY
- RUN
- CMD

#### Compose

- docker-compose up --build -d
- docker-compose down
- docker-compose rm -f
- docker-compose pull
- docker-compose up -d --no-deps --force-recreate --build
- docker-compose stop -t 1
- docker-compose build --no-cache
- docker compose ls
- version
- services
- build
- ports
- environment
- restart
- networks
- volumes

## Summary

So that's docker, I know it can seem like a lot, but if you learn to setup docker once for one project, you can copy&paste it for every future project with minimal modifications.

We learned to run our own docker containers, some cool stuff we can do with docker, how volumes are awesome for development, how networks can create inner docker communication, how dockerfiles can help build our own docker images, how compose can be used to put all our run commands in one file, and that this stuff can be extended to multiple machines using a docker orchestrator like Kubernetes or Swarm.

This post turned out much longer than I expected, but I hope it'll serve as a nice reference.

Thanks for reading.

Humaid Khan
