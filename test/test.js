var geojson2dsv = require('../');
var expect = require('expect.js');

describe('geojson2dsv', function() {
    it('encodes a single point', function() {
        expect(geojson2dsv({
            type: 'Point',
            coordinates: [0,0]
        })).to.eql('lon,lat\n0,0');
    });
    it('customizes a delimiter', function() {
        expect(geojson2dsv({
            type: 'Point',
            coordinates: [0,0]
        }, ';')).to.eql('lon;lat\n0;0');
    });
    it('encodes a feature', function() {
        expect(geojson2dsv({
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
        expect(geojson2dsv({
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
    it('encodes properties of non-points', function() {
        expect(geojson2dsv({
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
        })).to.eql('a\nb');
    });
    it('encodes properties of mixed geometry types', function() {
        expect(geojson2dsv({
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [10,0]
                },
                properties: {
                    a: 'x'
                }
            },{
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [[10,0]]
                },
                properties: {
                    a: 'y'
                }
            }]
        })).to.eql('a\nx\ny');
    });
});
