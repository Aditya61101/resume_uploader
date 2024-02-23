# stage 1
FROM node as BUILD_IMAGE
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD_IMAGE /app/dist /user/share/nginx/html