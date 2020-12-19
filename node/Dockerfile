
FROM node:alpine

WORKDIR /mnt

RUN apk update && \
    apk add --no-cache git curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh
RUN yarn global add typescript

CMD [ "/sbin/init" ]
