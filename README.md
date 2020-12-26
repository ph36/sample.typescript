
# Sample TypeScript

TypeScript の勉強.

Setup
--------

```sh
git config user.email "<email>"
```

```sh
cat << 'EOF' >> .env
USER=${USER}
EOF
sudo docker-compose build
sudo docker-compose run node --version
sudo docker-compose up -d
sudo docker-compose exec --user ${UID} node tsc --version
```

```sh
sudo docker-compose exec --user ${UID} node /bin/sh
tsc --init
# -> target, outDir etc. を指定
```

Usage
--------

基本

```sh
sudo docker-compose exec --user ${UID} node /bin/sh
./run hello.ts
	hello
```

パッケージの追加

```sh
cd mnt/work
yarn add @types/node
```

Learned
--------
