FROM nginx:1.27-alpine

ENTRYPOINT []

USER root

# set timezone.
RUN apk add tzdata && ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime && date

ENV TARGET_DIR /var/www/aidt/bo-web
RUN mkdir -p $TARGET_DIR
RUN ["chmod", "u-w,g-r", "/etc/shadow"]

COPY ./default.conf /etc/nginx/conf.d/

COPY ./dist $TARGET_DIR

CMD ["nginx", "-g", "daemon off;"]