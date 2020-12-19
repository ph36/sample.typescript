
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
# -> outDir etc. を指定
```

Usage
--------

基本

```sh
sudo docker-compose exec --user ${UID} node /bin/sh
tsc --outDir out hello.ts && node out/hello.js
	hello
```

Learned
--------
