'use strict';

var fs = require('fs');
var grunt = require('grunt');
var cheerio = require("cheerio");

var path = 'test/out';
var htmlPath = path + '/test.html.twig';
var iePath = path + '/test.xml';

exports.favicons = {

    // testing if is html.twig file
    htmlExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(htmlPath);
        test.ok(exists, 'test.html.twig does not exist.');
        test.done();
    },

    // testing if config file exists
    ieExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(iePath);
        test.ok(exists, 'test.xml does not exist.');
        test.done();
    },

    // testing if html contains reference to config file
    htmlmrExists: function(test) {
        test.expect(1);
        var $ = cheerio.load(grunt.file.read(htmlPath));
        var metaIcon = 0;
        $('meta').each(function(i, elem) {
            var name = $(this).attr('name');
            if(name && (name === 'msapplication-config')) {
                metaIcon ++;
            }
        });

        test.ok(metaIcon === 1, 'meta icons length should be 1; but is ' + metaIcon);
        test.done();
    },

    // testing if html meta data is not in html
    htmlmiExists: function(test) {
        test.expect(1);
        var $ = cheerio.load(grunt.file.read(htmlPath));
        var metaIcon = 0;
        $('meta').each(function(i, elem) {
            var name = $(this).attr('name');
            if(name && (name === 'msapplication-TileImage' ||
                        name === 'msapplication-TileColor' ||
                        name.indexOf('msapplication-square') >= 0)) {
                metaIcon ++;
            }
        });

        test.ok(metaIcon === 0, 'meta icons length should be 0; but is ' + metaIcon);
        test.done();
    }
};
