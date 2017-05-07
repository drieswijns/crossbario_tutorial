docker build -t crossbar.server .

docker run -it --net=host -v "$(realpath .)":/home/root/ crossbar.server
