## mapbox devtool

### usage

``` bash
yarn add @automan-component/mapbox-devtool
```

```js
import mapboxDevtool from '@automan-component/mapbox-devtool';
...
const map = new mapboxgl.Map({
	...
});
map.addControl(
	new mapboxDevtool()
);

```
