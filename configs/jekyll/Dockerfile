FROM alpine:3.7
LABEL maintainer="Ivan Fesyuk <eneus@i.ua>"

ENV BUILD_PACKAGES bash curl-dev make build-base libffi-dev clang zlib-dev libxml2-dev libxslt-dev readline-dev yaml-dev zlib libxml2 imagemagick
ENV RUBY_PACKAGES ruby ruby-dev ruby-io-console ruby-bundler ruby-rdoc ruby-irb

# Update and install all of the required packages.
# At the end, remove the apk cache
RUN apk update && \
    apk upgrade && \
    apk add $BUILD_PACKAGES && \
    apk add $RUBY_PACKAGES && \
    rm -rf /var/cache/apk/*
    
RUN gem install \
  github-pages \
  github-pages-health-check \
  html-pipeline \
  i18n \
  jekyll bundler \
  jekyll-paginate \
  jekyll-sitemap \
  jekyll-redirect-from \
  jekyll-feed \
  jekyll-multisite \
  jekyll-github-metadata \
  jekyll-seo-tag \
  jekyll-watch \
  jekyll-sass-converter \
  compass \
  zurb-foundation\
  kramdown \
  rdiscount \
  rouge \
  uglifier \
  sprockets \
  mini_magick \
  image_optim \
  image_optim_bin \
  jekyll-assets \
  jekyll-compass \
  bourbon \
  jekyll-multiple-languages-plugin
RUN gem clean

#Install packages
RUN apk add --update nodejs nodejs-npm yarn git

# Add user and group named Jekyll
RUN addgroup -Sg 1000 jekyll
RUN adduser  -Su 1000 -G \
  jekyll jekyll

RUN mkdir -p /srv/jekyll && chown -R jekyll:jekyll /srv/jekyll
RUN echo 'jekyll ALL=NOPASSWD:ALL' >> /etc/sudoers

EXPOSE 4000