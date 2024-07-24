FOREGROUND_URLS=(
  "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/6fc391c8-2e8b-4854-b84c-3c94c431fb19/ca5e1b68-4c6b-403b-b95a-a77a6f529da5.png"
  "https://freepngimg.com/download/lamborghini/35507-1-lamborghini-gallardo-transparent-picture.png"
)

BACKGROUND_URLS=(
  "https://wallpapers.com/images/hd/empty-open-space-parking-lot-8p3rjostav8z2doh.jpg"
  "https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg"
)

URL="http://localhost:3000/join-images?foreground=$FOREGROUND_URLS&background=$BACKGROUND_URLS"

# echo $URL

autocannon --renderStatusCodes -c500 $URL