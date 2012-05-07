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
rm "$OUTPUTDIR/resources/" -r

####################################################
# RESOURCES                                        #
####################################################
echo "Copying 'resources''..."
#mkdir "$OUTPUTDIR/resources/"
for file in resources*; do
    cp -rv $file "$OUTPUTDIR/"
done

####################################################
# RESOURCES/INCLUDES/SNDK                          #
####################################################
rm "$OUTPUTDIR/resources/includes/sndk" -r
cp -rvL "resources/includes/sndk" "$OUTPUTDIR/resources/includes/"

####################################################
# PERMISSIONS			                           #
####################################################
chmod 777 "$OUTPUTDIR/resources/"
chmod 777 "$OUTPUTDIR/resources/"* -R

####################################################
# JAVASCRIPT                                       #
####################################################
echo "Building 'javascript'..."
jsbuilder javascript.jsb "$OUTPUTDIR/resources/js/"
