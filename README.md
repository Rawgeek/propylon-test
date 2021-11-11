# Propylon Technical Assesment

Web application that allows users to store and later retrieve files at a specified URL.

## Setup
```
node@17.0.1
python@3.9.7
```

### Install:
* [nvm](https://github.com/nvm-sh/nvm)
* [pyenv](https://github.com/pyenv/pyenv)
* [pipenv](https://pipenv.readthedocs.io/en/latest/)

```
$ git clone git@github.com:rawgeek/propylon.git
$ cd propylon/propylon-js
$ nvm install
$ npm install
$ cd ..
```

### If on Mac OS X Mojave:
```
CFLAGS="-I$(xcrun --show-sdk-path)/usr/include" pyenv install
```
### Else:
```
$ pyenv install
```

### Next:
```
$ pipenv install
$ pipenv shell
$ ./manage.py migrate
$ ./manage.py runserver
```

If you wish to only generate a fresh front-end build, run:
```
$ npm run build
```

To run in front-end in development mode, run:
```
$ npm start
```

## Unit Tests
```
$ python manage.py test
```

### Test login:
```
login: user
password: qr0p!l0N
```

### Admin user:
```
login: admin
password: qr0p!l0N
```
