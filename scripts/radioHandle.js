/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-06-05 00:02:15
 * @version $Id$
 */

define([], function () {
    'use strict';
    var RadioHandle = function (options) {
        this.pages = options.pages;
    };
    RadioHandle.prototype.produceRadio = function () {
        var pages = this.pages;
        for (var i=0; i<pages.length; ++i) {
            var id = pages.models[i].get('pageId'),
                name = pages.models[i].get('name');
            if (i === 0) {
                $('#pages').append('<label class="btn btn-primary active"><input type="radio" name="page" value="'+id+'" checked> '+name+'</label>');
            } else {
                $('#pages').append('<label class="btn btn-primary"><input type="radio" name="page" value="'+id+'"> '+name+'</label>');
            }

        }
    };

    RadioHandle.prototype.setClickEvent = function () {
        var pages = this.pages;
        $('#pages input').on('change', function (e) {
            var pageId = $('input:checked', '#pages').val().toString();
            var index = pages.map(function (element) {return element.get('pageId');}).indexOf(pageId);
            index = parseInt(index, 10);
            if (pages.models[index]) {
              $('#appTitle').html('搜尋' + pages.models[index].get('name'));
            }
        });
    };
    return RadioHandle;
});