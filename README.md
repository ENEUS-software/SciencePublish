# Docker for local development

## Table of contents

* [Cheatsheet](#cheatsheet)
* [Drush](#drush)
* [Drupal settings.php](#drupal-settingsphp)
* [Tune docker-compose.yml locally](#tune-docker-composeyml-locally)
* [Configure PHPStorm Xdebug](#configure-phpstorm-xdebug)

## Cheatsheet

1. Run docker-compose containers. Containers will be initialised (updated), started and run in detached mode. Use it always to run the containers.

	```shell
	$ docker-compose up -d
	```

2. Stop docker-compose containers. 

	**NOTE!** Use it when you go home to continue tomorrow!

	```shell
	$ docker-compose stop
	```

	Or stop particular container

	```shell
	$ docker-compose stop nginx
	```

3. Stop and destroy containers. 

	**CAUTION!** All data in containers will be lost. If the DB is in docker volume, it will be lost. Use it only when you are done or want to fully re-initilisee containers. In most cases `up` is enough.

	```shell
	$ docker-compose down
	```

4. Restart whole project or a particular container, e.g. `nginx` is restarted only in that way. 

	```shell
	$ docker-compose restart
	$ docker-compose restart nginx
	```

	These will not update containers when `docker-compose.yml` is changed, use `up`.

5. See container logs. Use to check service specific logs, e.g. when nginx container doesn't start

	```shell
	$ docker-compose logs nginx
	```

6. Run a command in a container

	```shell
	$ docker-compose exec eneus_php bash
	$ docker-compose exec --user=root eneus_php bash
	$ docker-compose exec eneus_php drush cc all
	```

### Drush

1. Go inside container with 

	```shell
	$ docker-compose exec eneus_php sh
	```

	and use `drush`, `drupal`, `composer` as on local machine.

2. Clear cache from host machine

	```shell
	$ docker-compose exec eneus_php drush cc all
	```

3. Clear varnish with qtools

	```shell
	$ docker-compose exec eneus_php sh
	$ drush eval 'return qtools_varnish_purge_request( "/" );'
	```

4. Restart varnish to clear cache

	```shell
	$ docker-compose restart varnish
	```

5. SQL dump

	Put sql dump file into project directory or map it in `docker-compose.override.yml` to `eneus_php` service.

	Run container cli and run `drush` from `docroot`

	```shell
	$ docker-compose exec eneus_php bash
	$ gunzip < dump.sql.gz | drush sql-cli
	```


## Drupal settings.php

To access the website add records to `/etc/hosts`:

```
127.0.0.1 mufe.local central.mufe.local html.mufe.local
```

Change `settings.php` to use internal docker DNS names. Internal DNS names are the same as container name in `docker-compose.yml`.

1. For database `host` will be `mariadb`:

    ```php
    $databases = array (
      'default' =>
        array (
          'default' =>
            array (
              'database' => 'eneus',
              'username' => 'eneus',
              'password' => 'eneus',
              'host' => 'mysql',
              'port' => '3306',
              'driver' => 'mysql',
			  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
              'prefix' => '',
            ),
        ),
    );
    ```

2. Memcache:

    ```php
    $conf['memcache_servers'] = array(
      'memcached:11211' => 'default',
      'memcached2:11211' => 'bin2',
      'memcached3:11211' => 'bin3',
      'memcached4:11211' => 'bin4',
      'memcached5:11211' => 'bin5',
      'memcached6:11211' => 'bin6',
    );
    ```

4. Varnish:

    ```php
    $conf['qtools_varnish_settings']['connection']['control_terminal'] = 'varnish:6082';
    $conf['qtools_varnish_settings']['connection']['control_key'] = 'local';
    ```

## Tune docker-compose.yml locally

Local configuration may require to override configuration which is in git.
Use `docker-compose.override.yml` which is gitignored. There is a proposed local configuration in `docker-compose.override.yml.dist` file.

```shell
$ cp docker-compose.override.yml.dist docker-compose.override.yml
```

Read comments in the file to tune for your needs.

## Configure PHPStorm Xdebug

1. Configure host IP address to be known in docker environment.

	MacOS: `$ sudo ifconfig lo0 alias 10.254.254.254`

	IP can be set on startup, refer to https://wodby.com/stacks/drupal/docs/local/xdebug/

	Linux and Windows must have IPs already configured. Linux - `172.17.0.1` and Windows `10.0.75.1` (default).

2. Configure PhpStorm, open **Settings**

3. On **Languages & Frameworks -> Debug**

	Set **Max. simultaneous connections** to more than `1` (e.g. `5`) to correctly accept drush connections from CLI

4. On **Languages & Frameworks -> Debug -> DBGp Proxy** set

  * IDE Key: `PHPSTORM`
  * Host: `10.254.254.254` (Mac only)

	Host might not be required on Linux and Windows. Check **Automatically detect IDE IP** on **Languages & Frameworks -> Debug** for Linux - `172.17.0.1` and Windows `10.0.75.1` (default).

5. On **Languages & Frameworks -> Servers** add new server with `+`

  * Name: `application` (name is set to handle CLI debug, in docker-compose the same name is defined as env variable), 
  * Host: `mufe.local` (website uri), 

	Map project files to docker (change localpath to yours):

  * Project files: `/your/local/path/to/MUFE`
  * Absolute path on the server: `/var/www/MUFE`
