define("radioHandle",[],function(){var e=function(e){this.pages=e.pages};return e.prototype.produceRadio=function(){var e=this.pages;for(var t=0;t<e.length;++t){var n=e.models[t].get("pageId"),r=e.models[t].get("name");t===0?$("#pages").append('<label class="btn btn-primary active"><input type="radio" name="page" value="'+n+'" checked> '+r+"</label>"):$("#pages").append('<label class="btn btn-primary"><input type="radio" name="page" value="'+n+'"> '+r+"</label>")}},e.prototype.setClickEvent=function(){var e=this.pages;$("#pages input").on("change",function(t){var n=$("input:checked","#pages").val().toString(),r=e.map(function(e){return e.get("pageId")}).indexOf(n);r=parseInt(r,10),e.models[r]&&$("#appTitle").html("搜尋"+e.models[r].get("name"))})},e}),function(){define("searcher",[],function(){var e=function(){var e=this;this.isSearching=!1,this.cancelSearch=!1};return e.prototype.search=function(e){if(this.isSearching===!0){this.stopSearching();return}if($("#keyword").val()==="")return;var t=Parse.Object.extend("Keyword"),n=new t;n.set("keyword",$("#keyword").val()),n.set("userId",e),n.save(null,{}),$("#search").html("停止搜尋").removeClass("btn-success").addClass("btn-danger"),$("#searchingPage").css("display","block"),this.isSearching=!0,$("#result").empty(),$("#loadingIcon").show();var r=$("input:checked","#pages").val().toString();this.keyword=$("#keyword").val(),this.results=[];var i="/v2.0/"+r+"/feed?limit=40&fields=message";this.index=1,this.recur(i)},e.prototype.recur=function(e){$("#searchingPage").html("已搜尋"+this.index+"頁");if(this.cancelSearch===!0){this.searchFinished();return}var t=$.Deferred(),n=this;FB.api(e,function(e){(!e||!e.data)&&t.reject();for(var r=0;r<e.data.length;++r)e.data[r].message&&e.data[r].message.indexOf(n.keyword)!==-1&&(n.results.push(e.data[r].message),$("#result").append('<div class="post">'+e.data[r].message+"</div>"));t.resolve(),$.when(t).then(function(){if(e.paging===undefined){console.log("no more posts"),n.searchFinished();return}if(e.paging.next){var t=e.paging.next;n.index++,n.recur(t)}else console.log("end....")},function(){console.log("failed")})})},e.prototype.stopSearching=function(){this.cancelSearch=!0},e.prototype.searchFinished=function(){$("#loadingIcon").hide(),this.isSearching=!1,this.cancelSearch=!1,$("#search").html("搜尋").removeClass("btn-danger").addClass("btn-success"),$("#searchingPage").append("，搜尋結束。")},e})}(),requirejs({baseUrl:"scripts/",shim:{}}),require(["radioHandle","searcher"],function(e,t){var n,r=function(r){var i=new e({pages:r});i.produceRadio(),i.setClickEvent();var s=new t;window.fbAsyncInit=function(){FB.init({appId:"439312986102441",xfbml:!0,version:"v2.0"}),$("#appStart").click(function(e){FB.login(function(e){e.status==="connected"&&(n=e.authResponse.userID,$("#appStart").hide(0),$("#keyword").show(0),$("#search").show(0),$("#search").click(function(){s.search(n)}),$("#keyword").keydown(function(e){e.which==13&&s.search(n)}))})})},function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n))return;r=e.createElement(t),r.id=n,r.src="//connect.facebook.net/en_US/sdk.js",i.parentNode.insertBefore(r,i)}(document,"script","facebook-jssdk")};Parse.initialize("W4JNaLiHL9YdTLkkc0rTHadM4Y6PY1DyQVDA9AhT","RJFfqYzLTHA5QUaJiAntLd7ZmEBBzgp3h82XEWr5"),Page=Parse.Object.extend("Page");var i=Parse.Collection.extend({model:Page}),s=new i;s.fetch({success:function(e){r(e)}})}),define("main",function(){});