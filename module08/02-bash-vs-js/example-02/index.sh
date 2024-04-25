sudo docker run -p "8080:80" -d nginx
sleep .5
curl --silent localhost:8080

CONTAINER_ID=$(sudo docker ps | grep nginx | awk '{ print $1 }')

echo logs
sudo docker logs $CONTAINER_ID

echo rm
sudo docker rm -f $CONTAINER_ID