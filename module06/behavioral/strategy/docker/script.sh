docker run \
  --name postgres \
  -e POSTGRES_USER={user} \
  -e POSTGRES_PASSWORD={password} \
  -e POSTGRES_DB={database} \
  -p {host}:{container} \
  -d \
  postgres

# CREATE TABLE warriors(id serial PRIMIRAY KEY, name VARCHAR(255) NOT NULL);

docker run \
  --name mongo \
  -e MONGO_INITDB_ROOT_USERNAME={user} \
  -e MONGO_INITDB_ROOT_PASSWORD={password} \
  -p {host}:{container} \
  -d \
  mongo:4