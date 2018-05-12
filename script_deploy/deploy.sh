#!/bin/bash

sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && pkill java"
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && pkill node"
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && git pull"
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && ./mvnw > script_deploy/deploy.mvnw.log 2>&1 & "
sleep 1m
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && yarn webpack:build > script_deploy/deploy.yarnstart.log 2>&1 &"
