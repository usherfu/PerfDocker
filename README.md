# PerfDocker

To build docker image
```
   docker build perftest .
```


Example of switch different shell scripts at startup of docker.

-Start script "/usr/src/scripts/docker/start_mvn"
```
	docker run --entrypoint=/bin/bash perftest /usr/src/scripts/docker/start_mvn
```


-Start script "/usr/src/scripts/docker/start_wpt"
```
	docker run --entrypoint=/bin/bash perftest /usr/src/scripts/docker/start_wpt locations
```


-Start script "/usr/src/scripts/docker/start_phantomas"
```
	docker run --entrypoint=/bin/bash perftest /usr/src/scripts/docker/start_phantomas https://www.google.com --verbose
```

 
