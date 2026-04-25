#!/bin/bash

echo "Installing NEXTRO..."

# Install dependencies

sudo apt update
sudo apt install -y nodejs npm python3 python3-pip ffmpeg git curl

# Install yt-dlp

pip3 install -U yt-dlp

# Clone repo

git clone https://github.com/kakashiplayz26606/nextro-cli.git
cd nextro-cli

# Install node packages

npm install

# Link globally

sudo npm link

echo "✅ NEXTRO installed!"
echo "Run: nextro"
