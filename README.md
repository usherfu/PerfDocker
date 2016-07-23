# PerfDocker

To build docker image
```
   docker build -t perftest .
```


Example of switch different shell scripts at startup of docker.

-Start script "/usr/src/scripts/docker/start_mvn"
```
	docker run --entrypoint=/bin/bash perftest /usr/src/scripts/docker/start_mvn --version
```

Additionally you can also git clone a project on the fly and compile it. See start_mvn for details.


-Start script "/usr/src/scripts/docker/start_wpt"
```
	docker run --entrypoint=/bin/bash perftest /usr/src/scripts/docker/start_wpt locations
```


-Start script "/usr/src/scripts/docker/start_phantomas"
```
	docker run --entrypoint=/bin/bash perftest /usr/src/scripts/docker/start_phantomas https://www.google.com --verbose
```
 How to integrate phantomas with Jenkins: http://fairl.es/2014/02/02/phantomas-performance-testing-and-jenkins/


git cheatsheet

call git add/commit/push in one command

  see http://stackoverflow.com/questions/19595067/git-add-commit-and-push-commands-in-one
 
