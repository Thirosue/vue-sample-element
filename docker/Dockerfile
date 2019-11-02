FROM nginx:alpine

MAINTAINER takeshi.hirosue@bigtreetc.com

RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 80
STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]