#!/bin/bash

npm run router

npm run build


if [ $1 = 'prod01' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-01:/data/work/frontend/kr-admin-applet/

elif [ $1 = 'prod02' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-02:/data/work/frontend/kr-admin-applet/

elif [ $1 = 'all' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-01:/data/work/frontend/kr-admin-applet/
rsync -rvltOD ./dist/* ali-krspace-web-02:/data/work/frontend/kr-admin-applet/

fi
