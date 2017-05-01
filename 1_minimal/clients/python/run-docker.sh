docker build -t crossbar.python .
docker run -it -v "$(realpath .)":/home/root/ --net=host crossbar.python
