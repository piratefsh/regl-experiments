#!/usr/bin/env bash
ffmpeg -y -framerate 30 -i $1/frame%08d.jpg -b 10000k -vf "vflip" -c:v libx264 -r 30 out.mp4

