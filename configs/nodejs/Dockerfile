FROM node:8.1
MAINTAINER Ivan Fesyuk <Ivan.Fesyuk@gmail.com>

WORKDIR /srv/html/testsite
VOLUME /srv/www

# Install packages
RUN mpm install
RUN mpm install bower \
    gulp

RUN bower install
CMD gulp
# USER root
# COPY docker-entrypoint.sh /usr/local/bin/
# CMD docker-entrypoint.sh