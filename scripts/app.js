angular.module("templates",[]).run(["$templateCache",function(t){t.put("404/404.html","<div style=color:white;><h1>404</h1><p>Two roads diverged in a yellow wood,<br>And sorry I could not travel both<br>And be one traveler, long I stood<br>And looked down one as far as I could<br>To where it bent in the undergrowth;</p><p>Then took the other, as just as fair,<br>And having perhaps the better claim,<br>Because it was grassy and wanted wear;<br>Though as for that the passing there<br>Had worn them really about the same,</p><p>And both that morning equally lay<br>In leaves no step had trodden black.<br>Oh, I kept the first for another day!<br>Yet knowing how way leads on to way,<br>I doubted if I should ever come back.</p><p>I shall be telling this with a sigh<br>Somewhere ages and ages hence:<br>Two roads diverged in a wood, and I—<br>I took the one less traveled by,<br>And that has made all the difference.</p></div>"),t.put("cardGroup/cardGroup.html",'<div class="panel panel-default" ng-controller="CardGroupController as vm"><div class=panel-heading><span>{{vm.cardGroup.name}}</span> <span class=badge ng-if=!vm.isEditing>{{vm.cardGroup.count()}}</span> <button class="btn btn-default btn-xs" ng-if=!vm.isEditing ng-click=vm.startEditing()>Edit</button> <button class="btn btn-default btn-xs" ng-if=vm.isEditing ng-click=vm.applyChanges()>Apply Changes</button> <button class="btn btn-default btn-xs" ng-if=vm.isEditing ng-click=vm.discardChanges()>Discard Changes</button></div><div class="alert alert-danger margin" ng-if="vm.cardGroup.failedCards.length > 0">Couldn\'t identify the following cards:<ul><li ng-repeat="card in vm.cardGroup.failedCards">{{card.name}}</li></ul></div><div class=margin ng-if="!vm.isEditing && vm.cardGroup.count() > 0"><div class=row><div class=col-sm-4 ng-repeat="category in vm.categories"><div class=card-group ng-repeat="type in category.types" ng-if="vm.cardGroup.countByPrimaryType(type) > 0"><h3>{{type}} <span class=badge>{{vm.cardGroup.countByPrimaryType(type)}}</span></h3><div ng-repeat="card in vm.cardGroup.getCardsByPrimaryType(type)"><span class=quantity>{{card.quantity}}</span> <a class=name href={{card.storeUrl()}} target=_blank card-preview=card.imageUrl()>{{card.name}}</a> <span class=price></span></div></div></div></div></div><form name=vm.form class=margin ng-if=vm.isEditing><div class=form-group><textarea class=form-control ng-model=vm.cardsBlob></textarea></div><button class="btn btn-default" type=button ng-click=vm.applyChanges()>Apply Changes</button> <button class="btn btn-default" type=button ng-click=vm.discardChanges()>Discard Changes</button></form></div>'),t.put("decks/decks.html",'<div ng-controller="DecksController as vm"><spinner class=light ng-if=!vm.decks></spinner><div class=list-group><a class=list-group-item href=#/decks/{{deck.id}} ng-repeat="deck in vm.decks">{{deck.name}}</a></div></div>'),t.put("deck/deck.html",'<div ng-controller="DeckController as vm"><spinner class=light ng-if=!vm.deck></spinner><div class="panel panel-default" ng-if=vm.deck><div class="panel-heading form-inline"><input class="form-control name-input" ng-model=vm.deck.name ng-model-options="{updateOn: \'blur\'}" ng-change=vm.onChange() pu-elastic-input> <button class="btn btn-default" ng-click=vm.save() ng-if=!vm.deck.id ng-disabled=vm.isSaving>{{ vm.isSaving ? "Syncing" : "Sync to Cloud" }}<pulse ng-if=vm.isSaving></pulse></button> <button class="btn btn-default" ng-click=vm.delete() ng-if=vm.deck.id ng-disabled=vm.isDeleting>{{ vm.isDeleting ? "Removing" : "Remove from Cloud" }}<pulse ng-if=vm.isDeleting></pulse></button></div></div><div class="panel panel-default" ng-if="vm.deck.cardGroups[0].cards.length > 0"><div class=panel-heading>Stats</div><div class=panel-body ng-if="vm.deck.cardGroups[0].cards.length > 0"><stats cards=vm.deck.cardGroups[0].cards></stats></div></div><div ng-repeat="cardGroup in vm.deck.cardGroups"><card-group group=cardGroup on-change=vm.onChange></card-group></div></div>'),t.put("pulse/pulse.html",'<div class="sk-spinner sk-spinner-pulse"></div>'),t.put("spinner/spinner.html",'<div class=sk-fading-circle><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'),t.put("statGroup/statGroup.html",'<div class=stat-group><h3>{{group.name}}</h3><div ng-repeat="stat in group.stats"><span class=name>{{stat.name}}</span> <span class=bar>{{"X".repeat(stat.value)}}</span> <span class=value ng-if="stat.value > 0">{{stat.value}}</span></div></div>'),t.put("stats/statsView.html",'<div ng-controller="StatsController as vm"><div class=row ng-if="vm.statGroups.length > 0"><div class=col-xs-12><stat-group group=vm.statGroups[0]></stat-group></div></div></div>')}]);var app;!function(t){angular.module("app",["templates","ngRoute","puElasticInput","ngLocationUpdate"])}(app||(app={}));var app;!function(t){angular.module("app").constant("config",appConfig)}(app||(app={}));var app;!function(t){var e=function(){function t(t){t.when("/decks/:id",{templateUrl:"deck/deck.html"}).when("/decks",{templateUrl:"decks/decks.html"}).otherwise({templateUrl:"404/404.html"})}return t.$inject=["$routeProvider"],t}();angular.module("app").config(e)}(app||(app={}));var app;!function(t){var e=function(){function t(t){var e=this;this.config=t,this.imageUrl=function(){return e.config.imagesUrl+e.multiverseId+".jpg"},this.storeUrl=function(){return e.config.storeUrl+e.name.replace(/ /g,"+")}}return t}();t.Card=e}(app||(app={}));var app;!function(t){var e=function(){function e(e){var r=this;this.CardService=e,this.setCards=function(t){var e=r.getNameQuantityPairs(t);r.loadCards(e),r.cardBlob=r.formatCardBlob(e)},this.getCards=function(){return r.cardBlob},this.getCardsByPrimaryType=function(t){return r.cards.filter(function(e){return e.primaryType===t})},this.count=function(){return r.cards.reduce(function(t,e){return t+Number(e.quantity)},0)},this.countByPrimaryType=function(t){return r.getCardsByPrimaryType(t).reduce(function(t,e){return t+Number(e.quantity)},0)},this.convertToTitleCase=function(t){return t.replace(/[^\s-]+/g,function(t){return["a","an","of","the","to"].indexOf(t)>=0?t:t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()})},this.getNameQuantityPairs=function(e){return e.split(/\n[\s\n]*/).map(function(e){var n=/^(?:(\d+)[Xx]?\s)?\s*([^0-9]+)$/.exec(e.trim()),a=new t.NameQuantityPair;return null===n?a.name=e:(a.quantity=Number(n[1]||1),a.name=r.convertToTitleCase(n[2].trim())),a}).reduce(function(t,e){var r=t.filter(function(t){return t.name===e.name})[0];return r?r.quantity=r.quantity+e.quantity:t.push(e),t},[]).sort(function(t,e){return void 0===t.quantity==(void 0===e.quantity)?t.name>e.name?1:-1:void 0===t.quantity?1:void 0===e.quantity?-1:void 0})},this.loadCards=function(t){r.failedCards=[];var e=t.map(function(t){return t.name.trim()}).filter(function(t){return t&&t.length>2});return 0===e.length?void(r.cards=[]):void r.CardService.getCards(e).then(function(e){var n=[];t.forEach(function(t){var a=e.filter(function(e){return e.name.toLowerCase()===t.name.toLowerCase()})[0];return void 0===a?void r.failedCards.push(t):(a.quantity=t.quantity,void n.push(a))}),r.cards=n.sort(function(t,e){return t.name>e.name?1:-1})})},this.formatCardBlob=function(t){return t.map(function(t){return(t.quantity?t.quantity+"x ":"")+t.name}).join("\n")},this.name=name,this.cards=[],this.cardBlob=""}return e}();t.CardGroup=e}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var r=this;this.$q=t,this.DeckService=e,this.save=function(){if(r.id)return r.DeckService.updateDeck(r);var t=r.$q.defer();return r.DeckService.createDeck(r).then(function(e){r.id=e,t.resolve()},t.reject),t.promise},this["delete"]=function(){if(r.id){var t=r.$q.defer();return r.DeckService.deleteDeck(r.id).then(function(){r.id=void 0,t.resolve()},t.reject),t.promise}return r.$q.reject()}}return t}();t.Deck=e}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var r=this;this.config=t,this.CardFactory=e,this.key="cards",this.get=function(t){var e=JSON.parse(localStorage.getItem(r.key)),n=(new Date).getTime();if(!e)return e={},localStorage.setItem(r.key,JSON.stringify(e)),[];var a=t.map(function(t){return e[t.toLowerCase()]}).filter(function(t){return void 0!==t&&(t.date=n,!0)}).map(function(t){return angular.merge(r.CardFactory.createCard(),t)});return localStorage.setItem(r.key,JSON.stringify(e)),a},this.add=function(t){if(0!==r.config.cardCacheLimit){var e=JSON.parse(localStorage.getItem(r.key)),n=(new Date).getTime();t.map(function(t){return{date:n,name:t.name,primaryType:t.primaryType,cmc:t.cmc,multiverseId:t.multiverseId}}).forEach(function(t){e[t.name.toLowerCase()]=t});var a=Object.keys(e);if(a.length>r.config.cardCacheLimit){var i=a.length-r.config.cardCacheLimit,i=i>r.config.cardCacheLimit/10?i:Math.ceil(r.config.cardCacheLimit/10);a.sort(function(t,r){return e[t].date-e[r].date}).slice(0,i).forEach(function(t){delete e[t]})}localStorage.setItem(r.key,JSON.stringify(e));(new Date).getTime()}}}return t.$inject=["config","CardFactory"],t}();t.CardCacheService=e,angular.module("app").service("CardCacheService",e)}(app||(app={}));var app;!function(t){var e=function(){function e(t){this.$injector=t}return e.$inject=["$injector"],e.prototype.createCard=function(){return new t.Card(this.$injector.get("config"))},e}();t.CardFactory=e,angular.module("app").service("CardFactory",e)}(app||(app={}));var app;!function(t){var e=function(){function e(t){this.$injector=t}return e.$inject=["$injector"],e.prototype.createCardGroup=function(){return new t.CardGroup(this.$injector.get("CardService"))},e}();t.CardGroupFactory=e,angular.module("app").service("CardGroupFactory",e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,r,n,a){var i=this;this.config=t,this.$http=e,this.$q=r,this.CardCacheService=n,this.CardFactory=a,this.getCards=function(t){var e=i.CardCacheService.get(t),r=t.filter(function(t){return!e.some(function(e){return e.name.toLowerCase()===t.toLowerCase()})});if(0===r.length)return i.$q.when(e);var n=i.$q.defer(),a=i.config.cardsUrl+"?"+r.map(function(t){return"name="+t.replace(/ /g,"+")}).join("&");return i.getCardsRecursively(a,t,e,0,n),n.promise},this.getCardsRecursively=function(t,e,r,n,a){if(n>1)throw"page is too damn high";var c=t+"&page="+n;i.$http.get(c).then(function(c){if(r=r.concat(c.data.map(i.mapApiCard)),c.data.length>=100)i.getCardsRecursively(t,e,r,n+1,a);else{e=e.map(function(t){return t.toLowerCase()});var o=[];r.forEach(function(t){e.indexOf(t.name.toLowerCase())>=0&&o.push(t)}),i.CardCacheService.add(o),a.resolve(o)}})},this.mapApiCard=function(t){var e=i.CardFactory.createCard();return e.name=t.name,e.cmc=t.cmc,e.primaryType=i.config.types.filter(function(e){return t.types.indexOf(e)>=0})[0],e.multiverseId=t.editions.map(function(t){return t.multiverse_id}).sort(function(t,e){return t-e}).pop(),e},this.cache={}}return t.$inject=["config","$http","$q","CardCacheService","CardFactory"],t}();t.CardService=e,angular.module("app").service("CardService",e)}(app||(app={}));var app;!function(t){var e=function(){function e(t){this.$injector=t}return e.$inject=["$injector"],e.prototype.createDeck=function(){return new t.Deck(this.$injector.get("$q"),this.$injector.get("DeckService"))},e}();t.DeckFactory=e,angular.module("app").service("DeckFactory",e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,r,n,a){var i=this;this.$http=e,this.$q=r,this.DeckFactory=n,this.CardGroupFactory=a,this.getDeck=function(t){var e=i.$q.defer();return i.$http.get(i.url+"/"+t).then(function(t){e.resolve(i.mapApiDeck(t.data))}),e.promise},this.getDecksByQuery=function(t){var e=i.$q.defer();return i.$http.get(i.url).then(function(t){e.resolve(t.data.results)}),e.promise},this.createDeck=function(t){var e=i.$q.defer(),r={name:t.name,data:{cardGroups:t.cardGroups.map(function(t){return{name:t.name,cards:t.getCards()}})}};return i.$http.post(i.url,r).then(function(t){e.resolve(t.data.id)}),e.promise},this.updateDeck=function(t){var e=i.$q.defer(),r={name:t.name,data:{cardGroups:t.cardGroups.map(function(t){return{name:t.name,cards:t.getCards()}})}};return i.$http.put(i.url+"/"+t.id,r).then(function(){e.resolve()}),e.promise},this.deleteDeck=function(t){var e=i.$q.defer();return i.$http["delete"](i.url+"/"+t).then(function(){e.resolve()}),e.promise},this.mapApiDeck=function(t){var e=i.DeckFactory.createDeck();return e.id=t.id,e.name=t.name,e.cardGroups=t.data.cardGroups.map(function(t){var e=i.CardGroupFactory.createCardGroup();return e.name=t.name,e.setCards(t.cards),e}),e},this.url=t.decksUrl}return t.$inject=["config","$http","$q","DeckFactory","CardGroupFactory"],t}();t.DeckService=e,angular.module("app").service("DeckService",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){}return t}();t.NameQuantityPair=e}(app||(app={}));var app;!function(t){var e=function(){function t(){}return t}();t.Stat=e}(app||(app={}));var app;!function(t){var e=function(){function t(){}return t}();t.StatGroup=e}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={group:"=",onChange:"="},this.templateUrl="cardGroup/cardGroup.html"}return t}();angular.module("app").directive("cardGroup",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var r=this;this.startEditing=function(){r.cardsBlob=r.cardGroup.getCards(),r.isEditing=!0},this.applyChanges=function(){r.form.$dirty&&(r.cardGroup.setCards(r.cardsBlob),r.onChange&&r.onChange()),r.isEditing=!1},this.discardChanges=function(){r.isEditing=!1},this.cardGroup=t.group,this.onChange=t.onChange,this.isEditing=!1,this.categories=e.categories}return t.$inject=["$scope","config"],t}();angular.module("app").controller("CardGroupController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){var t=this;this.getOffset=function(t){var e=t.getBoundingClientRect(),r=window.pageXOffset||document.documentElement.scrollLeft,n=window.pageYOffset||document.documentElement.scrollTop;return{top:e.top+n,left:e.left+r}},this.showCardPreview=function(e,r){var n=document.getElementById("card-preview");n||(n=document.createElement("img"),n.id="card-preview",document.body.appendChild(n));var a=t.getOffset(e.currentTarget);n.style.top=a.top-100+"px",n.style.left=a.left+e.currentTarget.offsetWidth+20+"px",n.src=r},this.hideCardPreview=function(t){var e=document.getElementById("card-preview");e.src="",e.style.top="-300px",e.style.left="-200px"},this.restrict="A",this.scope={cardPreview:"="},this.link=function(e,r,n){r[0].addEventListener("mouseover",function(r){t.showCardPreview(r,e.cardPreview)}),r[0].addEventListener("mouseleave",t.hideCardPreview)}}return t}();angular.module("app").directive("cardPreview",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="decks/decks.html"}return t}();angular.module("app").directive("decks",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t){var e=this;t.getDecksByQuery(null).then(function(t){e.decks=t.sort(function(t,e){return t.name>e.name?1:-1})})}return t.$inject=["DeckService"],t}();angular.module("app").controller("DecksController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={id:"="},this.templateUrl="deck/deck.html"}return t}();angular.module("app").directive("deck",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,r,n,a){var i=this;this.$location=e,this.DeckService=r,this.DeckFactory=n,this.CardGroupFactory=a,this.onChange=function(){i.deck.id&&i.deck.save()},this.save=function(){i.isSaving=!0,i.deck.save()["finally"](function(){i.isSaving=!1,i.$location.update_path("/decks/"+i.deck.id)})},this["delete"]=function(){var t=confirm("Are you sure you want to remove this deck from the cloud?");t&&(i.isDeleting=!0,i.deck["delete"]()["finally"](function(){i.isDeleting=!1,i.$location.update_path("/decks/new")}))},this.createNewDeck=function(){var t=i.DeckFactory.createDeck();t.name="New Deck";var e=i.CardGroupFactory.createCardGroup(),r=i.CardGroupFactory.createCardGroup(),n=i.CardGroupFactory.createCardGroup();return e.name="Mainboard",r.name="Sideboard",n.name="Maybeboard",t.cardGroups=[e,r,n],t},"new"===t.id?this.deck=this.createNewDeck():this.DeckService.getDeck(t.id).then(function(t){i.deck=t})}return t.$inject=["$routeParams","$location","DeckService","DeckFactory","CardGroupFactory"],t}();angular.module("app").controller("DeckController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="pulse/pulse.html"}return t}();angular.module("app").directive("pulse",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="spinner/spinner.html"}return t}();angular.module("app").directive("spinner",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={group:"="},this.templateUrl="statGroup/statGroup.html"}return t}();angular.module("app").directive("statGroup",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={cards:"="},this.templateUrl="stats/statsView.html"}return t}();angular.module("app").directive("stats",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function e(e,r){var n=this;this.unique=function(t,e,r){return r.indexOf(t)===e},this.createStatGroup=function(e,r){var a=new t.StatGroup;a.name=r.name;var i=e.filter(function(t){return r.types.indexOf(t.primaryType)>=0}),c=i.map(function(t){return t.cmc}).filter(n.unique).sort();a.stats=[];for(var o=0;o<=c[c.length-1];++o){var s=new t.Stat;s.name=o.toString(),s.value=i.filter(function(t){return t.cmc===o}).reduce(function(t,e){return t+Number(e.quantity)},0),a.stats.push(s)}return a},this.createStatGroups=function(t,e){return e.map(function(e){return n.createStatGroup(t,e)})},this.updateStats=function(t,e,r){t&&t.length>0?n.statGroups=n.createStatGroups(t,n.categories):n.statGroups=[]},this.categories=r.statCategories,e.$watchCollection("cards",this.updateStats)}return e.$inject=["$scope","config"],e}();angular.module("app").controller("StatsController",e)}(app||(app={}));