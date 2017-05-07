docker build -t crossbar.jsserver .

docker run -it --net=host -v "$(realpath .)":/home/root/ crossbar.jsserver
