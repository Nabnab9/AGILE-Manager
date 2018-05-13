#!/bin/bash


if [ "$TRAVIS_BRANCH" == "master" ]; then

    echo '------ START DEPLOY ------'

    echo '--------- pkill java ------'
    sshpass -p $password ssh -t $username@$server "pkill java"

    echo '--------- pkill node ------'
    sshpass -p $password ssh -t $username@$server "pkill node"

    echo '--------- git pull ------'
    sshpass -p $password ssh -t $username@$server "cd projects/AGILE-Manager && git pull"

    echo '--------- create log folder ------'
    sshpass -p $password ssh -t $username@$server "cd projects/AGILE-Manager/script_deploy/logs/ && mkdir $TRAVIS_BUILD_NUMBER-$TRAVIS_JOB_NUMBER"

    echo '--------- yarn install ------'
    sshpass -p $password ssh -t $username@$server "cd projects/AGILE-Manager && yarn install > script_deploy/logs/$TRAVIS_BUILD_NUMBER-$TRAVIS_JOB_NUMBER/deploy.yarninstall.log 2>&1"

    echo '--------- sleep 30s then build app ------'
    sshpass -p $password ssh -t $username@$server "cd projects/AGILE-Manager && yarn webpack:build  > script_deploy/logs/$TRAVIS_BUILD_NUMBER-$TRAVIS_JOB_NUMBER/deploy.yarnbuild.log 2>&1"

    echo '--------- start server ------'
    sshpass -p $password ssh -t $username@$server "cd projects/AGILE-Manager && ./mvnw > script_deploy/logs/$TRAVIS_BUILD_NUMBER-$TRAVIS_JOB_NUMBER/deploy.mvnw.log 2>&1 & "

    echo '------ END DEPLOY ------'
else
    echo '------ NOT ON DEPLOY BRANCH ------'
fi
