(function () {
    'use strict';
    define([], function () {
        var Searcher = function () {
            var self = this;
            this.isSearching = false;
            this.cancelSearch = false;

        };
        Searcher.prototype.search = function (userId) {
            if (this.isSearching === true) {
                this.stopSearching();
                return;
            }
            if ($('#keyword').val() === '') {
              return;
            }

            var Keyword = Parse.Object.extend('Keyword');
            var keyword = new Keyword();
            keyword.set('keyword', $('#keyword').val());
            keyword.set('userId', userId);
            keyword.save(null, {});

            $('#search').html('停止搜尋').removeClass('btn-success').addClass('btn-danger');
            $('#searchingPage').css('display', 'block');

            this.isSearching = true;
            $('#result').empty();

            $('#loadingIcon').show();
            var pageId = $('input:checked', '#pages').val().toString();
            this.keyword = $('#keyword').val();
            this.results = [];
            var initUrl = '/v2.0/' + pageId + '/feed?limit=40&fields=message,actions';
            this.index = 1;
            this.recur(initUrl);
        };

        Searcher.prototype.recur = function (initUrl) {
            $('#searchingPage').html('已搜尋' + this.index + '頁');
            if (this.cancelSearch === true) {
                this.searchFinished();
                return;
            }
            var finisher = $.Deferred(),
                self = this;

            FB.api(initUrl, function (posts) {
                if (!posts || !posts.data) {
                    finisher.reject();
                }
                for (var i=0; i<posts.data.length; ++i) {
                    if (posts.data[i].message) {
                        if (posts.data[i].message.indexOf(self.keyword) !== -1){
                            //self.results.push(posts.data[i].message);
                            $('#result').append('<div class="post">' + posts.data[i].message + '<a href="' + posts.data[i].actions[0].link + '" class="link" target="_blank">連結至貼文</a></div>');
                        }
                    }
                }
                finisher.resolve();
                $.when(finisher).then(function () {
                    if (posts.paging === undefined) {
                        console.log('no more posts');
                        self.searchFinished();
                        //$('#loadingIcon').hide();
                        //self.isSearching = false;
                        return;
                    }
                    if (posts.paging.next) {
                        var nextInitUrl = posts.paging.next;
                        self.index++;
                        self.recur(nextInitUrl);
                    } else {
                        console.log('end....');
                    }
                }, function () {
                    console.log('failed');
                });
            });
        };

        Searcher.prototype.stopSearching = function () {
            this.cancelSearch = true;
        };

        Searcher.prototype.searchFinished = function () {
            $('#loadingIcon').hide();
            this.isSearching = false;
            this.cancelSearch = false;
            $('#search').html('搜尋').removeClass('btn-danger').addClass('btn-success');
            $('#searchingPage').append('，搜尋結束。');
        };

        return Searcher;
    });
}());