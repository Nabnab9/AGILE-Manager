#!/bin/bash

sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && chmod +x mvnw && ./mvnw > script/deploy.log & "
