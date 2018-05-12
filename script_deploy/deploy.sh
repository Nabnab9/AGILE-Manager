#!/bin/bash



echo '------ START DEPLOY ------'
echo '--------- pkill java ------'
sshpass -p ${password} ssh -t ${username}@${server} "cd projects/AGILE-Manager && mkdir testdepuistravis"
