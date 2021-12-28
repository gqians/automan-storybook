
const codes = '0123456789abcdefghijkmnpqrstuvwxyz'
function __decode(pch) {
	let v = 0
	for (let i = 3; i >= 0; --i) { v = v * 34 + (codes.indexOf(pch.charAt(i))) }
	v = v * 250 / 9
	return v
}

function __encode(v) {
	let pch = ''
	v = v * 9 / 250
	for (let i = 0; i < 4; ++i) {
		pch += codes.charAt(v % 34)
		v /= 34
	}
	return pch
}

function DecodeLon(k) {
	let lon = __decode(k.substring(1, 5))
	if (k.charAt(0) === '5' || k.charAt(0) === '8') { lon += 35000000 }
	lon += 70000000
	return lon / 1000000.0
}

function DecodeLat(k) {
	let lat = __decode(k.substring(5, 9))
	if (k.charAt(0) <= '6') { lat += 35000000 }
	lat += 5000000
	return lat / 1000000.0
}

function Encode(lat, lon) {
	lat = parseInt(lat * 1000000)
	lon = parseInt(lon * 1000000)
	let k
	lon -= 70000000
	lat -= 5000000
	if (lat > 35000000) {
		if (lon <= 35000000) { k = '6' } else { k = '5' }
	} else
	if (lon <= 35000000) { k = '7' } else { k = '8' }
	if (lon > 35000000) { lon -= 35000000 }
	if (lat > 35000000) { lat -= 35000000 }
	k += __encode(lon)
	k += __encode(lat)
	return k
}
// // console.log(Encode(26.638031, 102.578187))
// // console.log(DecodeLon('7qymur40m')) // 7xjuv0rtj
// // console.log(DecodeLat('7qymur40m'))
export { Encode, DecodeLon, DecodeLat }
