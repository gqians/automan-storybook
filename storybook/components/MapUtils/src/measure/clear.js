export function clear(map, layerID, overlayID) {
	const layers = map.getLayers()
	let effectiveLayer = null
	layers.forEach((layer) => {
	  if (layer.get('id') === layerID) {
			effectiveLayer = layer
	  }
	})
	effectiveLayer && map.removeLayer(effectiveLayer)
	const clearOverlay = []
	const overlays = map.getOverlays().getArray()
	for (const overlay of overlays) {
	  if (overlay.getId() === overlayID) {
			clearOverlay.push(overlay)
	  }
	}
	if (clearOverlay.length === 0) {
	  return
	} else {
	  clearOverlay.forEach((overlay) => {
			map.removeOverlay(overlay)
	  })
	  // 只删除一次会造成最后一个overlay遗留，所以需要递归删除
	  clear()
	}
}
