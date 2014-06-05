var dsv = require('dsv');
var normalize = require('geojson-normalize');

module.exports = function(_, delim) {
    _ = normalize(_);

    var onlyPoints = _.features.every(function(f) {
        return f.geometry.type === 'Point';
    });

    return dsv(delim || ',').format(_.features.map(function(f) {
        var p = JSON.parse(JSON.stringify(f.properties));
        if (onlyPoints) {
            p.lon = f.geometry.coordinates[0];
            p.lat = f.geometry.coordinates[1];
        }
        return p;
    }));
};
