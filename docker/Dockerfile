FROM nginx:alpine

MAINTAINER takeshi.hirosue@bigtreetc.com

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 80
STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]