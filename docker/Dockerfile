FROM nginx 

COPY ./dist /data 

RUN rm /etc/nginx/conf.d/default.conf

ADD pig-ui.conf /etc/nginx/conf.d/ 

ADD ads.crt /etc/nginx/conf.d/

ADD ads.key /etc/nginx/conf.d/

ADD minio.crt /etc/nginx/conf.d/

ADD minio.key /etc/nginx/conf.d/

RUN mv /etc/nginx/conf.d/pig-ui.conf /etc/nginx/conf.d/default.conf

RUN /bin/bash -c 'echo init ok'

EXPOSE 443
EXPOSE 80