var dsv = require('dsv');

module.exports = function(_, delim) {
    switch (_.type) {
        case 'FeatureCollection':
            break;
        case 'Feature':
            _ = { type: 'FeatureCollection', features: [_] };
            break;
        case 'Point':
            _ = { type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: _ }] };
            break;
        default:
            return null;
    }

    return dsv(delim || ',').format(_.features.filter(function(f) {
        return f.geometry.type == 'Point';
    }).map(function(f) {
        var p = JSON.parse(JSON.stringify(f.properties));
        p.lon = f.geometry.coordinates[0];
        p.lat = f.geometry.coordinates[1];
        return p;
    }));
};
