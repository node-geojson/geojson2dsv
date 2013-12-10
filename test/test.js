var geojson2csv = require('../');
var expect = require('expect.js');

describe('geojson2csv', function() {
    it('encodes a single point', function() {
        expect(geojson2csv({
            type: 'Point',
            coordinates: [0,0]
        })).to.eql('lon,lat\n0,0');
    });
    it('customizes a delimiter', function() {
        expect(geojson2csv({
            type: 'Point',
            coordinates: [0,0]
        }, ';')).to.eql('lon;lat\n0;0');
    });
    it('encodes a feature', function() {
        expect(geojson2csv({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [0,0]
            },
            properties: {
                a: 'b'
            }
        })).to.eql('a,lon,lat\nb,0,0');
    });
    it('encodes a featurecollection', function() {
        expect(geojson2csv({
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [10,0]
                },
                properties: {
                    a: 'b'
                }
            }]
        })).to.eql('a,lon,lat\nb,10,0');
    });
    it('ignores polygons', function() {
        expect(geojson2csv({
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [[10,0]]
                },
                properties: {
                    a: 'b'
                }
            }]
        })).to.eql('');
    });
});
