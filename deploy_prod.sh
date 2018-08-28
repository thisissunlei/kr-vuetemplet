#!/bin/bash

npm run build


if [ $1 = 'prod01' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-01:/data/work/frontend/vue-template/

elif [ $1 = 'prod02' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-02:/data/work/frontend/vue-template/

elif [ $1 = 'all' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-01:/data/work/frontend/vue-template/
rsync -rvltOD ./dist/* ali-krspace-web-02:/data/work/frontend/vue-template/

fi
