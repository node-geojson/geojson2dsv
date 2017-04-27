var dsvFormat = require('d3-dsv').dsvFormat;
var normalize = require('@mapbox/geojson-normalize');

/**
 * Given a valid GeoJSON object, return a CSV composed of all decodable points.
 * @param {Object} geojson any GeoJSON object
 * @param {string} delim CSV or DSV delimiter: by default, ","
 * @param {boolean} [mixedGeometry=false] serialize just the properties
 * of non-Point features.
 * @example
 * var csvString = geojson2dsv(geojsonObject)
 */
function geojson2dsv(geojson, delim, mixedGeometry) {
  var rows = normalize(geojson).features
    .map(function(feature) {
      if (feature.geometry && feature.geometry.type === 'Point') {
        return Object.assign({}, feature.properties, {
          lon: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1]
        });
      }
      if (mixedGeometry) {
        return feature.properties;
      }
    })
    .filter(Boolean);

  return dsvFormat(delim || ',').format(rows);
}

module.exports = geojson2dsv;
