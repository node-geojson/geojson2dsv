var geojson2dsv = require('../');
var test = require('tape');

test('geojson2dsv', function(t) {
  t.equal(
    geojson2dsv({
      type: 'Point',
      coordinates: [0, 0]
    }),
    'lon,lat\n0,0'
  );
  t.equal(
    geojson2dsv(
      {
        type: 'Point',
        coordinates: [0, 0]
      },
      ';'
    ),
    'lon;lat\n0;0'
  );
  t.equal(
    geojson2dsv({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0]
      },
      properties: {
        a: 'b'
      }
    }),
    'a,lon,lat\nb,0,0'
  );
  t.equal(
    geojson2dsv({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [10, 0]
          },
          properties: {
            a: 'b'
          }
        }
      ]
    }),
    'a,lon,lat\nb,10,0'
  );
  t.equal(
    geojson2dsv({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[10, 0]]
          },
          properties: {
            a: 'b'
          }
        }
      ]
    }),
    '',
    'polygon ignore'
  );
  t.equal(
    geojson2dsv({
      type: 'LineString',
      coordinates: [[10, 0], [0, 0]]
    }),
    null,
    'linestring ignore'
  );
  t.end();
});
