pkgname=yttrium-weather
pkgver=0.1.0alpha
pkgrel=1
pkgdesc='Minimal weather web app with geolocation, history, and map view'
arch=('any')
url='https://github.com/TTVIKK2527/weather-app'
license=('custom')
depends=('python' 'xdg-utils')
source=(
  'index.html'
  'style.css'
  'app.js'
  'yttrium-weather'
  'yttrium-weather.desktop'
)
sha256sums=('SKIP' 'SKIP' 'SKIP' 'SKIP' 'SKIP')

package() {
  install -d "$pkgdir/usr/share/yttrium-weather"
  install -Dm644 index.html "$pkgdir/usr/share/yttrium-weather/index.html"
  install -Dm644 style.css "$pkgdir/usr/share/yttrium-weather/style.css"
  install -Dm644 app.js "$pkgdir/usr/share/yttrium-weather/app.js"

  install -Dm755 yttrium-weather "$pkgdir/usr/bin/yttrium-weather"
  install -Dm644 yttrium-weather.desktop "$pkgdir/usr/share/applications/yttrium-weather.desktop"
}
