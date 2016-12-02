angular.module("templates",[]).run(["$templateCache",function(e){e.put("404/404.html","<div style=color:white;><h1>404</h1><p>Two roads diverged in a yellow wood,<br>And sorry I could not travel both<br>And be one traveler, long I stood<br>And looked down one as far as I could<br>To where it bent in the undergrowth;</p><p>Then took the other, as just as fair,<br>And having perhaps the better claim,<br>Because it was grassy and wanted wear;<br>Though as for that the passing there<br>Had worn them really about the same,</p><p>And both that morning equally lay<br>In leaves no step had trodden black.<br>Oh, I kept the first for another day!<br>Yet knowing how way leads on to way,<br>I doubted if I should ever come back.</p><p>I shall be telling this with a sigh<br>Somewhere ages and ages hence:<br>Two roads diverged in a wood, and I—<br>I took the one less traveled by,<br>And that has made all the difference.</p></div>"),e.put("cardGroup/cardGroup.html",'<div class="panel panel-default" ng-controller="CardGroupController as vm"><div class=panel-heading><span>{{vm.cardGroup.name}}</span> <span class=badge ng-if=!vm.isEditing>{{vm.cardGroup.count()}}</span> <button class="btn btn-default btn-xs" ng-if=!vm.isEditing ng-click=vm.startEditing()>Edit</button> <button class="btn btn-default btn-xs" ng-if=vm.isEditing ng-click=vm.applyChanges()>Apply Changes</button> <button class="btn btn-default btn-xs" ng-if=vm.isEditing ng-click=vm.discardChanges()>Discard Changes</button></div><div class="alert alert-danger margin" ng-if="vm.cardGroup.failedCardNames.length > 0">Couldn\'t identify the following card names:<ul><li ng-repeat="name in vm.cardGroup.failedCardNames">{{name}}</li></ul></div><div class=margin ng-if="!vm.isEditing && vm.cardGroup.count() > 0"><div class=row><div class=col-sm-4 ng-repeat="category in vm.categories"><div class=card-group ng-repeat="type in category.types" ng-if="vm.cardGroup.countByPrimaryType(type) > 0"><h3>{{type}} <span class=badge>{{vm.cardGroup.countByPrimaryType(type)}}</span></h3><div ng-repeat="card in vm.cardGroup.getCardsByPrimaryType(type)"><span class=quantity>{{card.quantity}}</span> <a class=name href={{card.storeUrl()}} target=_blank card-preview=card.imageUrl()>{{card.name}}</a> <span class=price></span></div></div></div></div></div><form class=margin ng-if=vm.isEditing><div class=form-group><textarea class=form-control ng-model=vm.cardsBlob></textarea></div><button class="btn btn-default" type=button ng-click=vm.applyChanges()>Apply Changes</button> <button class="btn btn-default" type=button ng-click=vm.discardChanges()>Discard Changes</button></form></div>'),e.put("deck/deck.html",'<div ng-controller="DeckController as vm"><spinner class=light ng-if=!vm.deck></spinner><div class="panel panel-default" ng-if=vm.deck><div class="panel-heading form-inline"><input class="form-control name-input" ng-model=vm.deck.name pu-elastic-input> <button class="btn btn-default" ng-click=vm.save() ng-disabled=vm.isSaving>{{ vm.isSaving ? "Saving" : vm.deck.id ? "Save Changes" : "Add to Cloud" }}<pulse ng-if=vm.isSaving></pulse></button> <button class="btn btn-default" ng-click=vm.delete() ng-if=vm.deck.id ng-disabled=vm.isDeleting>{{ vm.isDeleting ? "Removing" : "Remove from Cloud" }}<pulse ng-if=vm.isDeleting></pulse></button></div></div><div class="panel panel-default" ng-if="vm.deck.cardGroups[0].cards.length > 0"><div class=panel-heading>Stats</div><div class=panel-body ng-if="vm.deck.cardGroups[0].cardList.length > 0"><stats cards=vm.deck.cardGroups[0].cardList></stats></div></div><div ng-repeat="cardGroup in vm.deck.cardGroups"><card-group group=cardGroup></card-group></div></div>'),e.put("decks/decks.html",'<div ng-controller="DecksController as vm"><spinner class=light ng-if=!vm.decks></spinner><div class=list-group><a class=list-group-item href=#/decks/{{deck.id}} ng-repeat="deck in vm.decks">{{deck.name}}</a></div></div>'),e.put("pulse/pulse.html",'<div class="sk-spinner sk-spinner-pulse"></div>'),e.put("spinner/spinner.html",'<div class=sk-fading-circle><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'),e.put("statGroup/statGroup.html",'<div class=stat-group><h3>{{group.name}}</h3><div ng-repeat="stat in group.stats"><span class=name>{{stat.name}}</span> <span class=bar>{{"X".repeat(stat.value)}}</span> <span class=value ng-if="stat.value > 0">{{stat.value}}</span></div></div>'),e.put("stats/statsView.html",'<div ng-controller="StatsController as vm"><div class=row ng-if="vm.statGroups.length > 0"><div class=col-xs-12><stat-group group=vm.statGroups[0]></stat-group></div></div></div>')}]);var app;!function(e){angular.module("app",["templates","ngRoute","puElasticInput"])}(app||(app={})),function(){angular.module("app").constant("config",appConfig)}();var app;!function(e){var t=function(){function e(e){e.when("/decks/:id",{templateUrl:"deck/deck.html"}).when("/decks",{templateUrl:"decks/decks.html"}).otherwise({templateUrl:"404/404.html"})}return e.$inject=["$routeProvider"],e}();angular.module("app").config(t)}(app||(app={}));var app;!function(e){var t=function(){function e(e){var t=this;this.config=e,this.imageUrl=function(){return t.config.imagesUrl+t.multiverseId+".jpg"},this.storeUrl=function(){return t.config.storeUrl+t.name.replace(/ /g,"+")}}return e}();e.Card=t}(app||(app={}));var app;!function(e){var t=function(){function t(t){var r=this;this.CardService=t,this.setCards=function(e){r.cards=e,r.parseCards()},this.getCards=function(){return r.cards},this.getCardsByPrimaryType=function(e){return r.cardList.filter(function(t){return t.primaryType===e})},this.count=function(){return r.cardList.reduce(function(e,t){return e+Number(t.quantity)},0)},this.countByPrimaryType=function(e){return r.getCardsByPrimaryType(e).reduce(function(e,t){return e+Number(t.quantity)},0)},this.combineDuplicateNames=function(e){e=e.sort(function(e,t){return e.name>t.name?1:-1});for(var t=[],r=0;r<e.length;++r){for(var a=e[r];void 0!==e[r+1]&&a.name.toLowerCase()===e[r+1].name.toLowerCase();)a.quantity+=e[r+1].quantity,delete e[r+1],++r;t.push(a)}return t},this.parseCards=function(){r.failedCardNames=[];var t=r.cards.split("\n").filter(function(e){return e.trim().length>0}).map(function(t){var a=/^(?:(\d)+[Xx]?\s)?\s*([^0-9]+)$/.exec(t.trim());if(null===a)return void r.failedCardNames.push(t);var n=new e.NameQuantityPair;return n.name=a[2],n.quantity=Number(a[1]||1),n}).filter(function(e){return void 0!=e});t=r.combineDuplicateNames(t);var a=t.map(function(e){return e.name.trim()}).filter(function(e){return e&&e.length>2});return 0===a.length?void(r.cardList=[]):void r.CardService.getCards(a).then(function(e){var a=[];t.forEach(function(t){var n=e.filter(function(e){return e.name.toLowerCase()===t.name.toLowerCase()})[0];return void 0===n?void r.failedCardNames.push(t.name):(n.quantity=t.quantity,void a.push(n))}),r.cardList=a.sort(function(e,t){return e.name>t.name?1:-1})})},this.name=name,this.cardList=[],this.cards=""}return t}();e.CardGroup=t}(app||(app={}));var app;!function(e){var t=function(){function e(e,t){var r=this;this.$q=e,this.DeckService=t,this.save=function(){if(r.id)return r.DeckService.updateDeck(r);var e=r.$q.defer();return r.DeckService.createDeck(r).then(function(t){r.id=t,e.resolve()},e.reject),e.promise},this["delete"]=function(){if(r.id){var e=r.$q.defer();return r.DeckService.deleteDeck(r.id).then(function(){r.id=void 0,e.resolve()},e.reject),e.promise}return r.$q.reject()}}return e}();e.Deck=t}(app||(app={}));var app;!function(e){var t=function(){function e(){}return e}();e.NameQuantityPair=t}(app||(app={}));var app;!function(e){var t=function(){function e(){}return e}();e.Stat=t}(app||(app={}));var app;!function(e){var t=function(){function e(){}return e}();e.StatGroup=t}(app||(app={}));var app;!function(e){var t=function(){function e(e,t){var r=this;this.config=e,this.CardFactory=t,this.key="cards",this.get=function(e){var t=JSON.parse(localStorage.getItem(r.key)),a=(new Date).getTime();if(!t)return t={},localStorage.setItem(r.key,JSON.stringify(t)),[];var n=e.map(function(e){return t[e.toLowerCase()]}).filter(function(e){return void 0!==e&&(e.date=a,!0)}).map(function(e){return angular.merge(r.CardFactory.createCard(),e)});return localStorage.setItem(r.key,JSON.stringify(t)),n},this.add=function(e){if(0!==r.config.cardCacheLimit){var t=JSON.parse(localStorage.getItem(r.key)),a=(new Date).getTime();e.map(function(e){return{date:a,name:e.name,primaryType:e.primaryType,cmc:e.cmc,multiverseId:e.multiverseId}}).forEach(function(e){t[e.name.toLowerCase()]=e});var n=Object.keys(t);if(n.length>r.config.cardCacheLimit){var i=n.length-r.config.cardCacheLimit,i=i>r.config.cardCacheLimit/10?i:Math.ceil(r.config.cardCacheLimit/10);n.sort(function(e,r){return t[e].date-t[r].date}).slice(0,i).forEach(function(e){delete t[e]})}localStorage.setItem(r.key,JSON.stringify(t));(new Date).getTime()}}}return e.$inject=["config","CardFactory"],e}();e.CardCacheService=t,angular.module("app").service("CardCacheService",t)}(app||(app={}));var app;!function(e){var t=function(){function t(e){this.$injector=e}return t.$inject=["$injector"],t.prototype.createCard=function(){return new e.Card(this.$injector.get("config"))},t}();e.CardFactory=t,angular.module("app").service("CardFactory",t)}(app||(app={}));var app;!function(e){var t=function(){function t(e){this.$injector=e}return t.$inject=["$injector"],t.prototype.createCardGroup=function(){return new e.CardGroup(this.$injector.get("CardService"))},t}();e.CardGroupFactory=t,angular.module("app").service("CardGroupFactory",t)}(app||(app={}));var app;!function(e){var t=function(){function e(e,t,r,a,n){var i=this;this.config=e,this.$http=t,this.$q=r,this.CardCacheService=a,this.CardFactory=n,this.getCards=function(e){var t=i.CardCacheService.get(e),r=e.filter(function(e){return!t.some(function(t){return t.name.toLowerCase()===e.toLowerCase()})});if(0===r.length)return i.$q.when(t);var a=i.$q.defer(),n=i.config.cardsUrl+"?"+r.map(function(e){return"name="+e.replace(/ /g,"+")}).join("&");return i.getCardsRecursively(n,e,t,0,a),a.promise},this.getCardsRecursively=function(e,t,r,a,n){if(a>1)throw"page is too damn high";var c=e+"&page="+a;i.$http.get(c).then(function(c){if(r=r.concat(c.data.map(i.mapApiCard)),c.data.length>=100)i.getCardsRecursively(e,t,r,a+1,n);else{t=t.map(function(e){return e.toLowerCase()});var s=[];r.forEach(function(e){t.indexOf(e.name.toLowerCase())>=0&&s.push(e)}),i.CardCacheService.add(s),n.resolve(s)}})},this.mapApiCard=function(e){var t=i.CardFactory.createCard();return t.name=e.name,t.cmc=e.cmc,t.primaryType=i.config.types.filter(function(t){return e.types.indexOf(t)>=0})[0],t.multiverseId=e.editions.map(function(e){return e.multiverse_id}).sort(function(e,t){return e-t}).pop(),t},this.cache={}}return e.$inject=["config","$http","$q","CardCacheService","CardFactory"],e}();e.CardService=t,angular.module("app").service("CardService",t)}(app||(app={}));var app;!function(e){var t=function(){function t(e){this.$injector=e}return t.$inject=["$injector"],t.prototype.createDeck=function(){return new e.Deck(this.$injector.get("$q"),this.$injector.get("DeckService"))},t}();e.DeckFactory=t,angular.module("app").service("DeckFactory",t)}(app||(app={}));var app;!function(e){var t=function(){function e(e,t,r,a,n){var i=this;this.$http=t,this.$q=r,this.DeckFactory=a,this.CardGroupFactory=n,this.getDeck=function(e){var t=i.$q.defer();return i.$http.get(i.url+"/"+e).then(function(e){t.resolve(i.mapApiDeck(e.data))}),t.promise},this.getDecksByQuery=function(e){var t=i.$q.defer();return i.$http.get(i.url).then(function(e){t.resolve(e.data.results)}),t.promise},this.createDeck=function(e){var t=i.$q.defer(),r={name:e.name,data:{cardGroups:e.cardGroups.map(function(e){return{name:e.name,cards:e.getCards()}})}};return i.$http.post(i.url,r).then(function(e){t.resolve(e.data.id)}),t.promise},this.updateDeck=function(e){var t=i.$q.defer(),r={name:e.name,data:{cardGroups:e.cardGroups.map(function(e){return{name:e.name,cards:e.getCards()}})}};return i.$http.put(i.url+"/"+e.id,r).then(function(){t.resolve()}),t.promise},this.deleteDeck=function(e){var t=i.$q.defer();return i.$http["delete"](i.url+"/"+e).then(function(){t.resolve()}),t.promise},this.mapApiDeck=function(e){var t=i.DeckFactory.createDeck();return t.id=e.id,t.name=e.name,t.cardGroups=e.data.cardGroups.map(function(e){var t=i.CardGroupFactory.createCardGroup();return t.name=e.name,t.setCards(e.cards),t}),t},this.url=e.decksUrl}return e.$inject=["config","$http","$q","DeckFactory","CardGroupFactory"],e}();e.DeckService=t,angular.module("app").service("DeckService",t)}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.scope={group:"="},this.templateUrl="cardGroup/cardGroup.html"}return e}();angular.module("app").directive("cardGroup",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(e,t){var r=this;this.startEditing=function(){r.cardsBlob=r.cardGroup.getCards(),r.isEditing=!0},this.applyChanges=function(){r.cardGroup.setCards(r.cardsBlob),r.isEditing=!1},this.discardChanges=function(){r.isEditing=!1},this.cardGroup=e.group,this.isEditing=!1,this.categories=t.categories}return e.$inject=["$scope","config"],e}();angular.module("app").controller("CardGroupController",t)}(app||(app={}));var app;!function(e){var t=function(){function e(){var e=this;this.getOffset=function(e){var t=e.getBoundingClientRect(),r=window.pageXOffset||document.documentElement.scrollLeft,a=window.pageYOffset||document.documentElement.scrollTop;return{top:t.top+a,left:t.left+r}},this.showCardPreview=function(t,r){var a=document.getElementById("card-preview");a||(a=document.createElement("img"),a.id="card-preview",document.body.appendChild(a));var n=e.getOffset(t.currentTarget);a.style.top=n.top-100+"px",a.style.left=n.left+t.currentTarget.offsetWidth+20+"px",a.src=r},this.hideCardPreview=function(e){var t=document.getElementById("card-preview");t.src="",t.style.top="-300px",t.style.left="-200px"},this.restrict="A",this.scope={cardPreview:"="},this.link=function(t,r,a){r[0].addEventListener("mouseover",function(r){e.showCardPreview(r,t.cardPreview)}),r[0].addEventListener("mouseleave",e.hideCardPreview)}}return e}();angular.module("app").directive("cardPreview",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.scope={id:"="},this.templateUrl="deck/deck.html"}return e}();angular.module("app").directive("deck",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(e,t,r,a){var n=this;this.DeckService=t,this.DeckFactory=r,this.CardGroupFactory=a,this.save=function(){n.isSaving=!0,n.deck.save()["finally"](function(){n.isSaving=!1})},this["delete"]=function(){var e=confirm("Are you sure you want to remove this deck from the cloud?");e&&(n.isDeleting=!0,n.deck["delete"]()["finally"](function(){n.isDeleting=!1}))},this.createNewDeck=function(){var e=n.DeckFactory.createDeck();e.name="New Deck";var t=n.CardGroupFactory.createCardGroup(),r=n.CardGroupFactory.createCardGroup(),a=n.CardGroupFactory.createCardGroup();return t.name="Mainboard",r.name="Sideboard",a.name="Maybeboard",e.cardGroups=[t,r,a],e},"new"===e.id?this.deck=this.createNewDeck():this.DeckService.getDeck(e.id).then(function(e){n.deck=e})}return e.$inject=["$routeParams","DeckService","DeckFactory","CardGroupFactory"],e}();angular.module("app").controller("DeckController",t)}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.templateUrl="decks/decks.html"}return e}();angular.module("app").directive("decks",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(e){var t=this;e.getDecksByQuery(null).then(function(e){t.decks=e.sort(function(e,t){return e.name>t.name?1:-1})})}return e.$inject=["DeckService"],e}();angular.module("app").controller("DecksController",t)}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.templateUrl="pulse/pulse.html"}return e}();angular.module("app").directive("pulse",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.templateUrl="spinner/spinner.html"}return e}();angular.module("app").directive("spinner",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.scope={group:"="},this.templateUrl="statGroup/statGroup.html"}return e}();angular.module("app").directive("statGroup",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.scope={cards:"="},this.templateUrl="stats/statsView.html"}return e}();angular.module("app").directive("stats",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function t(t,r){var a=this;this.unique=function(e,t,r){return r.indexOf(e)===t},this.createStatGroup=function(t,r){var n=new e.StatGroup;n.name=r.name;var i=t.filter(function(e){return r.types.indexOf(e.primaryType)>=0}),c=i.map(function(e){return e.cmc}).filter(a.unique).sort();n.stats=[];for(var s=0;s<=c[c.length-1];++s){var o=new e.Stat;o.name=s.toString(),o.value=i.filter(function(e){return e.cmc===s}).reduce(function(e,t){return e+Number(t.quantity)},0),n.stats.push(o)}return n},this.createStatGroups=function(e,t){return t.map(function(t){return a.createStatGroup(e,t)})},this.updateStats=function(e,t,r){e&&e.length>0?a.statGroups=a.createStatGroups(e,a.categories):a.statGroups=[]},this.categories=r.statCategories,t.$watchCollection("cards",this.updateStats)}return t.$inject=["$scope","config"],t}();angular.module("app").controller("StatsController",t)}(app||(app={}));