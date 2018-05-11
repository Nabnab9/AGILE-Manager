#!/bin/bash

sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && pkill java && git pull && chmod +x mvnw && ./mvnw > deploy.log 2>&1 & "
