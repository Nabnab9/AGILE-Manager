#!/bin/bash

echo '------ START DEPLOY ------'
echo '--------- pkill java ------'
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && pkill java"
echo '--------- pkill node ------'
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && pkill node"
echo '--------- git pull ------'
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && git pull"
echo '--------- create log folder ------'
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager/script_deploy/logs/ && mkdir ${TRAVIS_JOB_NUMBER}-${TRAVIS_COMMIT}"
echo '--------- start server ------'
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && ./mvnw > script_deploy/${TRAVIS_COMMIT}/deploy.mvnw.log 2>&1 & "
echo '--------- sleep 1m ------'
sleep 1m
echo '--------- yarn build ------'
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && yarn webpack:build > script_deploy/$TRAVIS_COMMIT/deploy.yarnstart.log 2>&1 &"
