#!/bin/sh

# Exit the script on any command with non 0 return code
set -e

# // 16x16 .ico file
npx sharp -i ./assets/images/icon.png -o ./static/icons/favicon.ico resize 16