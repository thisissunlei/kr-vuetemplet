#!/bin/bash
npm run router
npm run build


buildEnvDir=$1
target_site=www@10.1.60.201
target_site_port=9830


test01_ip=ali-docker-test01
test02_ip=ali-docker-test02
test03_ip=ali-docker-test03
test04_ip=ali-docker-test04
dev01_ip=10.4.15.241
dev02_ip=10.4.15.242

case $1 in
  

  test01 )
    target_site="www@${test01_ip}"
    target_site_port=22
  ;;

  test02 )
    target_site="www@${test02_ip}"
    target_site_port=22
  ;;
  test03)
    target_site="www@${test03_ip}"
    target_site_port=22
  ;;

  test04)
    target_site="www@${test04_ip}"
    target_site_port=22
  ;;

  dev01)
    target_site="www@${dev01_ip}"
    target_site_port=22
  ;;

  dev02)
    target_site="www@${dev02_ip}"
    target_site_port=22
   
  ;;
  *)
  target_site=www@10.1.60.201
  target_site_port=9830


  ;;
esac

echo $1
echo $target_site

rsync -cza --delete-before  -e "ssh -p ${target_site_port}"  ./dist/* ${target_site}:/data/work/frontend/kr-admin-applet/ >/dev/null
