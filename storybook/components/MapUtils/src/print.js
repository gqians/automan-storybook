import { saveAs } from 'file-saver'
export function print(map, filename = '截图.png') {
	map.once('rendercomplete', () => {
		const mapCanvas = document.createElement('canvas')
		const size = map.getSize()
		mapCanvas.width = size[0]
		mapCanvas.height = size[1]
		const mapContext = mapCanvas.getContext('2d')
		Array.prototype.forEach.call(
			document.querySelectorAll('.ol-layer canvas'),
			function(canvas) {
				if (canvas.width > 0) {
					const opacity = canvas.parentNode.style.opacity
					mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity)
					const transform = canvas.style.transform
					// Get the transform parameters from the style's transform matrix
					const matrix = transform
						.match(/^matrix\(([^\(]*)\)$/)[1]
						.split(',')
						.map(Number)
					// Apply the transform to the export map context
					CanvasRenderingContext2D.prototype.setTransform.apply(
						mapContext,
						matrix
					)
					mapContext.drawImage(canvas, 0, 0)
				}
			}
		)
		if (navigator.msSaveBlob) {
			// link download attribuute does not work on MS browsers
			navigator.msSaveBlob(mapCanvas.msToBlob(), filename)
		} else {
			// let link = document.getElementById('image-download')
			// link.href = mapCanvas.toDataURL()
			// link.click()
			mapCanvas.toBlob((blob) => {
				saveAs(blob, filename)
			})
		}
	})
	map.renderSync()
}
