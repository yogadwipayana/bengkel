pm2 stop bengkel
pm2 delete bengkel
git stash
git pull
npm install
npm run build
PORT=5000 pm2 start npm --name "bengkel" -- run start

pm2 save