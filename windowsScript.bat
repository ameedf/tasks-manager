@echo off
echo --------------------------- Main project ---------------------------
call npm install
echo -------------------------- Client project --------------------------
cd client
call npm install
echo -------------------------- Server project ---------------------------
cd ..\server
call npm install
echo ------------------- Running 'npm run dev' script --------------------
cd ..
call npm run dev
