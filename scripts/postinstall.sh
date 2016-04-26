#!/bin/sh

echo "PostInstall"
mkdir -p src/js/vendor
cp node_modules/jquery-latitude-longitude-picker-gmaps/js/jquery-gmaps-latlon-picker.js src/js/vendor/
cp node_modules/suncalc/suncalc.js src/js/vendor/
