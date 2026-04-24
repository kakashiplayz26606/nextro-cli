Write-Host "Installing NEXTRO..." -ForegroundColor Cyan

# Install dependencies using winget

winget install OpenJS.NodeJS -e
winget install Python.Python.3 -e
winget install Gyan.FFmpeg -e
winget install Git.Git -e

# Install yt-dlp

pip install -U yt-dlp

# Clone repo

git clone https://github.com/YOUR_USERNAME/nextro-cli.git
cd nextro-cli

# Install node modules

npm install

# Link CLI globally

npm link

Write-Host "✅ NEXTRO installed!" -ForegroundColor Green
Write-Host "Type 'nextro' to start"
