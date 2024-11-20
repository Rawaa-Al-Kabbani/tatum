
FROM node:20.17.0 AS builder

ARG VITE_TATUM_API_KEY

ENV VITE_TATUM_API_KEY=$VITE_TATUM_API_KEY

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build


FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
