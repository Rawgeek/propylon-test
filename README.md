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
```

If you wish to only generate a fresh front-end build, run:
```
$ npm run build
$ cd ..
```

To run in front-end in development mode, run (currently isn't working correctly for :8000 port, use port :8080):
```
$ npm start
```
Open new terminal and continue below


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
$ pipenv install --dev
$ pipenv shell
$ ./manage.py migrate
$ ./manage.py createsuperuser
$ ./manage.py runserver

```

Go to http://localhost:8000 for user view and http://localhost:8000/admin/ for admin view

## Unit Tests
```
$ python manage.py test
```

## TODO / Known Issues

* List of documents isn't updated when adding new / deleting documents of Frontend
* Validate url available to users against system reserved urls
* Better validation for files
* Upgrade multipart file upload to json format (possibly use base64 or similar to pass file information. Ideally use separate service for file uploading like Amazon S3)
