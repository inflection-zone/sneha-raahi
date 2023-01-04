FROM node:18.12.0-alpine3.17 AS builder

RUN apk add bash
RUN apk add --no-cache \
        python3 \
    && rm -rf /var/cache/apk/*
RUN apk add --update alpine-sdk
RUN apk add chromium \
    harfbuzz

RUN apk update
RUN apk upgrade

WORKDIR /app
COPY . .
COPY package*.json /app/

RUN npm install -g typescript
RUN npm install
RUN npm run build

#######################################

FROM node:18.12.0-alpine3.17
RUN apk add bash
RUN apk add --no-cache \
        python3 \
    && rm -rf /var/cache/apk/*
RUN apk add --update alpine-sdk
RUN apk add chromium \
    harfbuzz

RUN apk update
RUN apk upgrade

#######################################

WORKDIR /app
RUN rm -rf ./*

COPY --from=builder /app/package*.json .
COPY --from=builder /app/entrypoint.sh .

COPY --from=builder /app/build .

RUN npm install --production
# RUN npm install pm2 -g
# RUN npm install sharp

EXPOSE 3000

# RUN chmod +x /app/entrypoint.sh
# ENTRYPOINT ["/bin/bash", "-c", "/app/entrypoint.sh"]
CMD ["node", "index.js"]
