var geojson2dsv = require('../');
var test = require('tap').test;

test('geojson2dsv', function(t) {
  t.test('encodes a single point', function(t) {
    t.equal(
      geojson2dsv({
        type: 'Point',
        coordinates: [0, 0]
      }),
      'lon,lat\n0,0'
    );
    t.end();
  });
  t.test('customizes a delimiter', function(t) {
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
    t.end();
  });
  t.test('encodes a feature', function(t) {
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
    t.end();
  });
  t.test('encodes a featurecollection', function(t) {
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
    t.end();
  });
  t.test('encodes properties of non-points', function(t) {
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
      }, ',', true),
      'a\nb'
    );
    t.end();
  });
  t.test('encodes properties of mixed geometry types', function(t) {
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
              a: 'x'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[10, 0]]
            },
            properties: {
              a: 'y'
            }
          }
        ]
      }, ',', true),
      'a,lon,lat\nx,10,0\ny,,'
    );
    t.end();
  });

  t.end();
});
