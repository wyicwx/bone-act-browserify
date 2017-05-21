var browserify = require('browserify');

exports.act = function(buffer, encoding, callback) {
    var bone = this.bone;
    var options = this.options({
    });
    var runtime = this;

    this.cacheable();

    var bundle = browserify(this.source, options);
    var deps = [];

    bundle.pipeline.get('deps').on('data', function(data) {
        deps.push(data.file);
    });

    bundle.bundle(function(error, result) {
        if (error) {
            bone.log.warn('bone-act-browserify', error);
            return callback(null, buffer);
        } else {
            runtime.addDependency(deps);
            return callback(null, result);
        }
    });
};

exports.filter = {
    ext: '.js'
};