# !/bin/bash

if [ $# -eq 0 ]
then
    echo "No argument, please add a day !"
    exit 1
fi

day="day_$1"

if [ -d $day ]
then
    echo "$day already exist, please use another number"
    exit 1
fi

js_file="$day.js"
mkdir $day
cd $day
npm init -y
echo "
{
  \"name\": \"$day\",
  \"version\": \"1.0.0\",
  \"description\": \"Day $1 of advent of code.\",
  \"main\": \"$js_file\",
  \"scripts\": {
    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"
  },
  \"keywords\": [],
  \"author\": \"Alexandre V.\",
  \"license\": \"ISC\"
}
" > "package.json"
touch $js_file
touch "input"
touch "example"
echo "const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');
" > $js_file
npm install fs
