# geojson2csv

The reverse of csv2geojson: shuttle [GeoJSON](http://geojson.org/) points into
CSV encoding.

Currently points only.

## api

### `csvString = geojson2csv(geojsonObject)`

Given a valid GeoJSON object, return a CSV composed of all decodable points.
