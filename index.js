var through = require('through2');

module.exports = function(options) {
    options = options || {};
    var spacesToTabs = options.spacesToTabs;
    if (spacesToTabs === true)
        spacesToTabs = 4;
    var tabsToSpaces = options.tabsToSpaces;
    if (tabsToSpaces === true)
        tabsToSpaces = 4;

    return through.obj(function(file, encoding, callback) {
        var str = file.contents.toString();

        if (spacesToTabs) {
            var regex = new RegExp('^((?: {' + spacesToTabs + '})+)', 'gm');
            str = str.replace(regex, function(all, spaces) {
                return new Array(spaces.length / 4 + 1).join('\t');
            });
       }
       if (tabsToSpaces) {
            var spaces = new Array(tabsToSpaces + 1).join(' ');
            str = str.replace(/^(\t+)/gm, function(all, tabs) {
                return new Array(tabs.length + 1).join(spaces);
            });
        }

        if (options.removeTrailing) {
            str = str.replace(/[ \t]+$/gm, function() {
                return '';
            });
        }       

        if (options.removeLeading) {
            str = str.replace(/^[ \t]+/gm, function() {
                return '';
            });
        }       

        file.contents = new Buffer(str);
        callback(null, file);
    });
};
