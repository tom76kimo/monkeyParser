/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-06-04 23:43:28
 * @version $Id$
 */
requirejs({
    baseUrl: 'scripts/',
    shim: {

    }
});

require(['radioHandle', 'searcher'], function (RadioHandle, Searcher) {

    var userId;
    /*
    var pages = [];
    pages.push({
        name: '告白國北',
        id: '613560588740220'
    });
    pages.push({
        name: '告白台大',
        id: '306966066122735'
    });*/
    var exec = function (pages) {
        var radioHandle = new RadioHandle({pages: pages});
        radioHandle.produceRadio();
        radioHandle.setClickEvent();

        var searcher = new Searcher();

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '439312986102441',
                xfbml      : true,
                version    : 'v2.0'
            });

            $('#appStart').click(function(event) {
                FB.login(function(response){
                    if (response.status === 'connected') {
                        userId = response.authResponse.userID;
                        $('#appStart').hide(0);
                        $('#keyword').show(0);
                        $('#search').show(0);
                        $('#search').click(function () {
                            searcher.search(userId);
                        });

                        $('#keyword').keydown(function(event) {
                        if (event.which == 13) {
                            searcher.search(userId);
                          }
                        });
                    }
                });
            });

            
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };

    Parse.initialize("W4JNaLiHL9YdTLkkc0rTHadM4Y6PY1DyQVDA9AhT", "RJFfqYzLTHA5QUaJiAntLd7ZmEBBzgp3h82XEWr5");
    Page = Parse.Object.extend('Page');
    var PageCollection = Parse.Collection.extend({
        model: Page
    });
    var pages = new PageCollection();
    pages.fetch({
        success: function (pages) {
            exec(pages);
        }
    });

});
