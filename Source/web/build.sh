#!/bin/bash
#
# Usage: build.sh [outputdirectory]

####################################################
# INIT                                             #
####################################################
BASEDIR=$(dirname "$1")
OUTPUTDIR="$1"

####################################################
# CLEAN                                            #
####################################################
echo "Cleaning previous build..."
rm "$OUTPUTDIR/html/sconsole/" -r
rm "$OUTPUTDIR/cgi-bin/Lib/data/sconsole/content/" -r

####################################################
# SETUP                                            #
####################################################
echo "Setting up build structur..."
mkdir "$OUTPUTDIR/html/sconsole/"
mkdir "$OUTPUTDIR/html/sconsole/js"
#mkdir "$OUTPUTDIR/cgi-bin/Lib//sconsole/"

####################################################
# CGI-BIN                                          #
####################################################
echo "Building 'cgi-bin'..."
for file in cgi-bin/*; do
    cp -rv $file "$OUTPUTDIR/cgi-bin/"
done

####################################################
# HTML                                             #
####################################################
echo "Building 'html'..."
for file in html/*; do
echo $file
    cp -rv $file "$OUTPUTDIR/html/"
done

####################################################
# JAVASCRIPT                                       #
####################################################
echo "Building 'javascript'..."
jsbuilder javascript.jsb "$OUTPUTDIR/html/sconsole/js/"
