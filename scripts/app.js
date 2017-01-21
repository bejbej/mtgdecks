angular.module("templates",[]).run(["$templateCache",function(t){t.put("404/404.html",'<div class="margin text-center" style=color:#f5f5f5;><h1>404</h1><span>~(=^..^)</span></div>'),t.put("auth/auth.html",'<div ng-controller="AuthController as vm"><button ng-click=vm.login() ng-if=!vm.isLoggedIn ng-disabled=vm.isLoggingIn><span ng-if=vm.isLoggingIn>*</span> Login</button> <button ng-click=vm.logout() ng-if=vm.isLoggedIn>Logout</button></div>'),t.put("cardGroup/cardGroup.html",'<div class="panel panel-default" ng-controller="CardGroupController as vm"><div class=panel-heading ng-if=!vm.isEditing ng-click="vm.showToolbar = !vm.showToolbar"><span>{{::vm.cardGroup.name}}</span> <span ng-if=!vm.isEditing><span class=badge ng-if=!vm.isEditing>{{vm.cardGroup.count()}}</span> <button class="btn btn-default btn-xs" ng-click="vm.startEditing(); $event.stopPropagation();" ng-if=vm.canEdit>Edit</button> <span class="glyphicon pull-right" ng-class="{\'glyphicon-chevron-up\': vm.showToolbar, \'glyphicon-chevron-down\': !vm.showToolbar}" ng-if="vm.cardGroup.cards.length > 0"></span></span></div><div class=panel-heading ng-if=vm.isEditing><span>{{::vm.cardGroup.name}}</span> <button class="btn btn-default btn-xs" ng-click=vm.applyChanges()>Apply Changes</button> <button class="btn btn-default btn-xs" ng-click=vm.discardChanges()>Discard Changes</button></div><div class=radio-group ng-if="vm.cardGroup.cards.length > 0 && !vm.isEditing && vm.showToolbar"><label><input type=radio ng-model=vm.view value=group-by-type ng-click="vm.showToolbar = false"> Card Type</label> <label><input type=radio ng-model=vm.view value=group-by-color ng-click="vm.showToolbar = false"> Color</label> <label><input type=radio ng-model=vm.view value=group-by-cmc ng-click="vm.showToolbar = false"> Converted Mana Cost</label></div><div class="alert alert-danger margin" ng-if="vm.cardGroup.failedCards.length > 0">Couldn\'t identify the following cards:<ul><li ng-repeat="card in ::vm.cardGroup.failedCards">{{::card.name}}</li></ul></div><div ng-if="!vm.isEditing && vm.cardGroup.cards.length > 0"><directive-container directive=vm.view cards=vm.cardGroup.cards></directive-container></div><form name=vm.form class=margin ng-if=vm.isEditing><div class=form-group><textarea class=form-control ng-model=vm.cardsBlob ng-model-options="{updateOn: \'blur\'}"></textarea></div><button class="btn btn-default" type=button ng-click=vm.applyChanges()>Apply Changes</button> <button class="btn btn-default" type=button ng-click=vm.discardChanges()>Discard Changes</button></form></div>'),t.put("cardSet/cardSet.html",'<div class=margin style="margin-top: 0px"><div class=row><div class=col-sm-4 ng-repeat="column in columns"><div class=card-group ng-repeat="row in ::column"><h3>{{::row.name}} <span class=badge>{{::row.numberOfCards}}</span></h3><div ng-repeat="card in ::row.cards"><span class=quantity>{{::card.quantity}}</span> <a class=name href={{::card.storeUrl()}} card-preview=card.imageUrl() lightbox=card.imageUrl()>{{::card.name}}</a> <span class=price></span></div></div></div></div></div>'),t.put("deck/deck.html",'<div ng-controller="DeckController as vm"><spinner class=light ng-if=!vm.deck></spinner><div class="panel panel-default" ng-if=vm.deck><div class="panel-heading form-inline"><span class=h4 ng-if=!vm.canEdit>{{vm.deck.name}}</span> <input class="form-control name-input" ng-model=vm.deck.name ng-model-options="{updateOn: \'blur\'}" ng-change=vm.onChange() pu-elastic-input ng-if=vm.canEdit> <button class="btn btn-default" ng-click=vm.save() ng-if="vm.canCreate && !vm.deck.id" ng-disabled=vm.isSaving>{{ vm.isSaving ? "Syncing" : "Sync to Cloud" }}<pulse ng-if=vm.isSaving></pulse></button> <button class="btn btn-default" ng-click=vm.delete() ng-if="vm.canEdit && vm.deck.id" ng-disabled=vm.isDeleting>{{ vm.isDeleting ? "Removing" : "Remove from Cloud" }}<pulse ng-if=vm.isDeleting></pulse></button></div></div><div class="panel panel-default" ng-if="vm.deck.cardGroups[0].cards.length > 0"><div class=panel-heading>Stats</div><div class=panel-body><stats cards=vm.deck.cardGroups[0].cards></stats></div></div><div ng-repeat="cardGroup in ::vm.deck.cardGroups"><card-group group=cardGroup on-change=vm.onChange can-edit=vm.canEdit></card-group></div></div>'),t.put("decks/decks.html",'<div ng-controller="DecksController as vm"><div class=list-group><a class=list-group-item href=#/decks/new><span class="glyphicon glyphicon-plus"></span> Build a New Deck</a></div><spinner class=light ng-if=vm.isSearching></spinner><div class=list-group><a class=list-group-item href=#/decks/{{::deck.id}} ng-repeat="deck in vm.decks">{{::deck.name}}</a></div></div>'),t.put("pulse/pulse.html",'<div class="sk-spinner sk-spinner-pulse"></div>'),t.put("spinner/spinner.html",'<div class=sk-fading-circle><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'),t.put("statGroup/statGroup.html",'<div class=stat-group><h3>{{::group.name}}</h3><div ng-repeat="stat in group.stats"><span class=name>{{::stat.name}}</span> <span class=bar>{{::"X".repeat(stat.value)}}</span> <span class=value ng-if="stat.value > 0">{{::stat.value}}</span></div></div>'),t.put("stats/statsView.html",'<div ng-controller="StatsController as vm"><div class=row ng-if="vm.statGroups.length > 0"><div class=col-xs-12><stat-group group=vm.statGroups[0]></stat-group></div></div></div>')}]);var app;!function(t){angular.module("app",["templates","ngRoute","puElasticInput","ngLocationUpdate","satellizer"])}(app||(app={}));var app;!function(t){angular.module("app").constant("config",appConfig),angular.module("app").config(["$authProvider","config",function(t,e){t.google({clientId:e.authClients.google.clientId,url:e.authClients.google.authUrl})}]);var e=void 0,n=function(){void 0===e?e=new Date:(new Date).getTime()-e.getTime()<100?(delete e,appConfig.enableHover=!0,document.body.removeEventListener("mouseover",n)):e=new Date};document.body.addEventListener("mouseover",n)}(app||(app={}));var app;!function(t){var e=function(){function t(t){t.when("/decks/:id",{templateUrl:"deck/deck.html"}).when("/decks",{templateUrl:"decks/decks.html",name:"My Decks"}).when("/",{redirectTo:"/decks"}).otherwise({templateUrl:"404/404.html",name:"Page Not Found"})}return t.$inject=["$routeProvider"],t}();angular.module("app").config(e),angular.module("app").run(["$rootScope",function(t){t.$on("$routeChangeStart",function(){document.title="Loading"}),t.$on("$routeChangeSuccess",function(t,e){e.name&&(document.title=e.name)})}])}(app||(app={}));var app;!function(t){var e=function(){function t(){}return t}();t.CardSet=e}(app||(app={}));var app;!function(t){var e=function(){function t(){var t=this;this.exec=function(e,n,r){for(var a=e.map(r),i=t.generateReferenceArray(a),c=[a.length],o=a.reduce(function(t,e){return t+e});;){var s=t.split(i,o-1);if(void 0===s)break;if(s.groupSizes.length>n)break;c=s.groupSizes,o=s.largestSize}var u=0;return c.map(function(t){var n=e.slice(u,u+t);return u+=t,n})},this.generateReferenceArray=function(t){for(var e=[],n=0;n<t.length;++n){var r=0,a=[];e.push(a);for(var i=n;i<t.length;++i)r+=t[i],a.push(r)}return e},this.split=function(t,e){for(var n=[],r=0,a=0;a<t.length;){var i=t[a];if(i[0]>e)return;for(var c=0;c<i.length-1&&!(i[c+1]>e);++c);r=i[c]>r?i[c]:r,n.push(c+1),a=a+c+1}return{groupSizes:n,largestSize:r}}}return t}();t.GroupEvenly=e}(app||(app={}));var app;!function(t){var e=function(){function t(){}return t}();t.NameQuantityPair=e}(app||(app={}));var app;!function(t){var e=function(){function t(){}return t}();t.Stat=e}(app||(app={}));var app;!function(t){var e=function(){function t(){}return t}();t.StatGroup=e}(app||(app={}));var app;!function(t){var e=function(){function t(t){var e=this;this.config=t,this.getOffset=function(t){var e=t.getBoundingClientRect(),n=window.pageXOffset||document.documentElement.scrollLeft,r=window.pageYOffset||document.documentElement.scrollTop;return{top:e.top+r,left:e.left+n}},this.showCardPreview=function(t,n){var r=document.getElementById("card-preview");r||(r=document.createElement("img"),r.id="card-preview",document.body.appendChild(r));var a=e.getOffset(t.currentTarget);r.style.top=a.top-100+"px",r.style.left=a.left+t.currentTarget.offsetWidth+20+"px",r.src=n},this.hideCardPreview=function(){var t=document.getElementById("card-preview");t&&(t.src="",t.style.top="-300px",t.style.left="-200px")},this.restrict="A",this.link=function(t,n,r){var a,i=function(n){e.config.enableHover&&(a||(a=t.$eval(r.lightbox)),e.showCardPreview(n,a))},c=function(t){e.config.enableHover&&e.hideCardPreview()};n[0].addEventListener("mouseover",i),n[0].addEventListener("mouseleave",c),t.$on("$destroy",function(){e.hideCardPreview(),n[0].removeEventListener("mouseover",i),n[0].removeEventListener("mousleave",c)})}}return t}();angular.module("app").directive("cardPreview",["config",function(t){return new e(t)}])}(app||(app={}));var app;!function(t){var e=function(){function t(t){var e=this;this.$compile=t,this.restrict="E",this.link=function(t,n,r){t.$watch(r.directive,function(a){var i=Object.keys(r).reduce(function(t,e){if("$"!==e[0]&&"directive"!==e){var n=e+'="'+r[e]+'"';t.push(n)}return t},[]).join(" "),c="<"+a+" "+i+"></"+a+">",o=e.$compile(c)(t);n[0].firstChild&&n[0].firstChild.remove(),n.append(o)})}}return t}();angular.module("app").directive("directiveContainer",["$compile",function(t){return new e(t)}])}(app||(app={}));var app;!function(t){var e=function(){function t(){var t=this;this.showLightbox=function(t,e){var n=document.createElement("div");n.className="lightbox";var r=document.createElement("img");r.src=e,n.appendChild(r),n.addEventListener("click",function(t){n.remove()}),document.body.appendChild(n),t.preventDefault()},this.restrict="A",this.link=function(e,n,r){var a;n[0].addEventListener("click",function(n){a||(a=e.$eval(r.lightbox)),t.showLightbox(n,a)})}}return t}();angular.module("app").directive("lightbox",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t){var e=this;this.config=t,this.imageUrl=function(){return e.config.imagesUrl+e.multiverseId+".jpg"},this.storeUrl=function(){return e.config.storeUrl+e.name.replace(/ /g,"+")}}return t}();t.Card=e}(app||(app={}));var app;!function(t){var e=function(){function e(e){var n=this;this.CardService=e,this.setCardBlob=function(t){var e=n.getNameQuantityPairs(t);n.loadCards(e),n.cardBlob=n.formatCardBlob(e)},this.getCardBlob=function(){return n.cardBlob},this.count=function(){return n.cards.reduce(function(t,e){return t+Number(e.quantity)},0)},this.formatName=function(t){var e=function(t){return t.replace(/[^\s-]+/g,function(t,e){return e>0&&["a","an","and","but","from","in","into","of","or","the","to","with"].indexOf(t.toLowerCase())>=0?t.toLowerCase():t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()})},n=function(t){return t.replace(/\s*[\/\\]{2}\s*/," // ")};return[function(t){return t.trim()},n,e].reduce(function(t,e){return e(t)},t)},this.getNameQuantityPairs=function(e){return e.split(/\n[\s\n]*/).map(function(e){var r=/^(?:(\d+)[Xx]?\s)?\s*([^0-9]+)$/.exec(e.trim()),a=new t.NameQuantityPair;return null===r?a.name=e:(a.quantity=Number(r[1]||1),a.name=n.formatName(r[2])),a}).reduce(function(t,e){var n=t.filter(function(t){return t.name===e.name})[0];return n?n.quantity=n.quantity+e.quantity:t.push(e),t},[]).sort(function(t,e){return void 0===t.quantity==(void 0===e.quantity)?t.name>e.name?1:-1:void 0===t.quantity?1:void 0===e.quantity?-1:void 0})},this.loadCards=function(t){n.failedCards=[];var e=t.map(function(t){return t.name.trim()}).filter(function(t){return t&&t.length>2});return 0===e.length?void(n.cards=[]):void n.CardService.getCards(e).then(function(e){var r=[];t.forEach(function(t){var a=e.filter(function(e){return e.name.toLowerCase()===t.name.toLowerCase()})[0];return void 0===a?void n.failedCards.push(t):(a.quantity=t.quantity,void r.push(a))}),n.cards=r.sort(function(t,e){return t.name>e.name?1:-1})})},this.formatCardBlob=function(t){return t.map(function(t){return(t.quantity?t.quantity+"x ":"")+t.name}).join("\n")},this.name=name,this.cards=[],this.cardBlob=""}return e}();t.CardGroup=e}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var n=this;this.$q=t,this.DeckService=e,this.save=function(){if(n.id)return n.DeckService.updateDeck(n);var t=n.$q.defer();return n.DeckService.createDeck(n).then(function(e){n.id=e,t.resolve()},t.reject),t.promise},this["delete"]=function(){if(n.id){var t=n.$q.defer();return n.DeckService.deleteDeck(n.id).then(function(){n.id=void 0,t.resolve()},t.reject),t.promise}return n.$q.reject()}}return t}();t.Deck=e}(app||(app={}));var app;!function(t){var e=function(){function t(){}return t}();t.User=e}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var n=this;this.config=t,this.CardFactory=e,this.key="cards",this.versionKey="cards-version",this.version="1",this.get=function(t){var e=JSON.parse(localStorage.getItem(n.key)),r=(new Date).getTime();if(!e)return e={},localStorage.setItem(n.key,JSON.stringify(e)),{cards:[],failedNames:t};var a={cards:[],failedNames:[]},a=t.reduce(function(t,a){var i=e[a.toLowerCase()];if(void 0===i)t.failedNames.push(a);else{i.date=r;var c=angular.merge(n.CardFactory.createCard(),i);delete c.date,t.cards.push(c)}return t},a);return localStorage.setItem(n.key,JSON.stringify(e)),a},this.add=function(t){if(0!==n.config.cardCacheLimit){var e=JSON.parse(localStorage.getItem(n.key)),r=(new Date).getTime();t.map(function(t){return{date:r,name:t.name,primaryType:t.primaryType,cmc:t.cmc,multiverseId:t.multiverseId,color:t.color}}).forEach(function(t){e[t.name.toLowerCase()]=t});var a=Object.keys(e);if(a.length>n.config.cardCacheLimit){var i=a.length-n.config.cardCacheLimit,i=i>n.config.cardCacheLimit/10?i:Math.ceil(n.config.cardCacheLimit/10);a.sort(function(t,n){return e[t].date-e[n].date}).slice(0,i).forEach(function(t){delete e[t]})}localStorage.setItem(n.key,JSON.stringify(e));(new Date).getTime()}},localStorage.getItem(this.versionKey)!==this.version&&(localStorage.removeItem(this.key),localStorage.setItem(this.versionKey,this.version))}return t.$inject=["config","CardFactory"],t}();t.CardCacheService=e,angular.module("app").service("CardCacheService",e)}(app||(app={}));var app;!function(t){var e=function(){function e(t){this.$injector=t}return e.$inject=["$injector"],e.prototype.createCard=function(){return new t.Card(this.$injector.get("config"))},e}();t.CardFactory=e,angular.module("app").service("CardFactory",e)}(app||(app={}));var app;!function(t){var e=function(){function e(t){this.$injector=t}return e.$inject=["$injector"],e.prototype.createCardGroup=function(){return new t.CardGroup(this.$injector.get("CardService"))},e}();t.CardGroupFactory=e,angular.module("app").service("CardGroupFactory",e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,n,r,a){var i=this;this.config=t,this.$http=e,this.$q=n,this.CardCacheService=r,this.CardFactory=a,this.getCards=function(t){var e=i.CardCacheService.get(t);if(0===e.failedNames.length)return i.$q.when(e.cards);var n=i.$q.defer(),r=i.config.cardsUrl+"?"+e.failedNames.map(function(t){return"name="+t.replace(/ /g,"+")}).join("&");return i.$http.get(r).then(function(t){var r=t.data.map(i.mapApiCard);i.CardCacheService.add(r),n.resolve(e.cards.concat(r))},n.reject),n.promise},this.mapApiCard=function(t){var e=i.CardFactory.createCard();return angular.merge(e,t)}}return t.$inject=["config","$http","$q","CardCacheService","CardFactory"],t}();t.CardService=e,angular.module("app").service("CardService",e)}(app||(app={}));var app;!function(t){var e=function(){function e(t){this.$injector=t}return e.$inject=["$injector"],e.prototype.createDeck=function(){return new t.Deck(this.$injector.get("$q"),this.$injector.get("DeckService"))},e}();t.DeckFactory=e,angular.module("app").service("DeckFactory",e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,n,r,a){var i=this;this.$http=e,this.$q=n,this.DeckFactory=r,this.CardGroupFactory=a,this.getDeck=function(t){var e=i.$q.defer();return i.$http.get(i.url+"/"+t).then(function(t){e.resolve(i.mapApiDeck(t.data))}),e.promise},this.getDecksByQuery=function(t){var e=i.$q.defer();return i.$http.get(i.url,{params:t}).then(function(t){e.resolve(t.data.results)}),e.promise},this.createDeck=function(t){var e=i.$q.defer(),n={name:t.name,cardGroups:t.cardGroups.map(function(t){return{name:t.name,cardBlob:t.getCardBlob()}})};return i.$http.post(i.url,n).then(function(t){e.resolve(t.data.id)}),e.promise},this.updateDeck=function(t){var e=i.$q.defer(),n={name:t.name,cardGroups:t.cardGroups.map(function(t){return{name:t.name,cardBlob:t.getCardBlob()}})};return i.$http.put(i.url+"/"+t.id,n).then(function(){e.resolve()}),e.promise},this.deleteDeck=function(t){var e=i.$q.defer();return i.$http["delete"](i.url+"/"+t).then(function(){e.resolve()}),e.promise},this.mapApiDeck=function(t){var e=i.DeckFactory.createDeck();return e.id=t.id,e.name=t.name,e.owners=t.owners,e.cardGroups=t.cardGroups.map(function(t){var e=i.CardGroupFactory.createCardGroup();return e.name=t.name,e.setCardBlob(t.cardBlob),e}),e},this.url=t.decksUrl}return t.$inject=["config","$http","$q","DeckFactory","CardGroupFactory"],t}();t.DeckService=e,angular.module("app").service("DeckService",e)}(app||(app={}));var app;!function(t){var e=function(){function e(e,n,r){var a=this;this.$http=e,this.$q=n,this.config=r,this.getMe=function(){var t=a.$q.defer();return a.$http.post(a.config.usersUrl+"/me",{}).then(function(e){t.resolve(a.mapApiUser(e.data))}),t.promise},this.mapApiUser=function(e){var n=new t.User;return n.id=e.id,n}}return e.$inject=["$http","$q","config"],e}();t.UserService=e,angular.module("app").service("UserService",e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,n){var r=this;this.$rootScope=t,this.$auth=e,this.UserService=n,this.login=function(){r.isLoggingIn=!0,r.$auth.authenticate("google").then(function(t){r.UserService.getMe().then(function(t){localStorage.setItem("user",JSON.stringify(t)),r.isLoggingIn=!1,r.updateAuthenticationStatus()})},function(){r.isLoggingIn=!1,console.log("failed to login")})},this.logout=function(){r.$auth.logout(),localStorage.removeItem("user"),r.updateAuthenticationStatus()},this.updateAuthenticationStatus=function(){r.isLoggedIn=r.$auth.isAuthenticated(),r.$rootScope.user=JSON.parse(localStorage.getItem("user")),r.$rootScope.$broadcast("authentication-changed")},this.updateAuthenticationStatus()}return t.$inject=["$rootScope","$auth","UserService"],t}();angular.module("app").controller("AuthController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={canEdit:"=",group:"=",onChange:"="},this.templateUrl="cardGroup/cardGroup.html"}return t}();angular.module("app").directive("cardGroup",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var n=this;this.$scope=t,this.view="group-by-type",this.updateEditability=function(){n.canEdit=n.$scope.canEdit,n.$scope.canEdit||n.discardChanges()},this.startEditing=function(){n.cardsBlob=n.cardGroup.getCardBlob(),n.isEditing=!0},this.applyChanges=function(){n.form.$dirty&&(n.cardGroup.setCardBlob(n.cardsBlob),n.onChange&&n.onChange()),n.isEditing=!1},this.discardChanges=function(){n.isEditing=!1},this.cardGroup=this.$scope.group,this.onChange=this.$scope.onChange,this.updateEditability(),this.$scope.$watch("canEdit",this.updateEditability),this.isEditing=!1}return t.$inject=["$scope","config"],t}();angular.module("app").controller("CardGroupController",e)}(app||(app={}));var app;!function(t){var e=function(){function e(){var e=this;this.groupByCmc=function(e){var n=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],r=n.reduce(function(n,r){var a=new t.CardSet;return a.name=r.toString()+" drop",a.cards=e.filter(function(t){return t.cmc===r}),a.numberOfCards=a.cards.reduce(function(t,e){return t+e.quantity},0),a.cards.length>0&&n.push(a),n},[]);return(new t.GroupEvenly).exec(r,3,function(t){return t.cards.length+4})},this.restrict="E",this.scope={cards:"="},this.templateUrl="cardSet/cardSet.html",this.link=function(t){t.$watchCollection("cards",function(n){t.columns=e.groupByCmc(n)})}}return e}();angular.module("app").directive("groupByCmc",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function e(){var e=this;this.groupByColor=function(e){var n=["white","blue","black","red","green","multicolored","colorless"],r=n.reduce(function(n,r){var a=new t.CardSet;return a.name=r,a.cards=e.filter(function(t){return t.color===r}),a.numberOfCards=a.cards.reduce(function(t,e){return t+e.quantity},0),a.cards.length>0&&n.push(a),n},[]);return(new t.GroupEvenly).exec(r,3,function(t){return t.cards.length+4})},this.restrict="E",this.scope={cards:"="},this.templateUrl="cardSet/cardSet.html",this.link=function(t){t.$watchCollection("cards",function(n){t.columns=e.groupByColor(n)})}}return e}();angular.module("app").directive("groupByColor",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function e(){var e=this;this.groupByType=function(e){var n=[["creature"],["artifact","enchantment","planeswalker","land"],["instant","sorcery"]];return n.map(function(n){return n.reduce(function(n,r){var a=new t.CardSet;return a.name=r,a.cards=e.filter(function(t){return t.primaryType===r}),a.numberOfCards=a.cards.reduce(function(t,e){return t+e.quantity},0),a.cards.length>0&&n.push(a),n},[])})},this.restrict="E",this.scope={cards:"="},this.templateUrl="cardSet/cardSet.html",this.link=function(t){t.$watchCollection("cards",function(n){t.columns=e.groupByType(n)})}}return e}();angular.module("app").directive("groupByType",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={id:"="},this.templateUrl="deck/deck.html"}return t}();angular.module("app").directive("deck",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,n,r,a,i){var c=this;this.$location=e,this.$scope=n,this.DeckService=r,this.DeckFactory=a,this.CardGroupFactory=i,this.updateTitle=function(){document.title=c.deck.name},this.updateAuthentication=function(){var t=c.$scope.user;c.canCreate=Boolean(t),c.canEdit=!c.deck.id||t&&c.deck.owners.indexOf(t.id)>=0},this.onChange=function(){c.updateTitle(),c.deck.id&&c.deck.save()},this.save=function(){c.isSaving=!0,c.deck.save()["finally"](function(){c.deck.owners=[c.$scope.user.id],c.isSaving=!1,c.$location.update_path("/decks/"+c.deck.id)})},this["delete"]=function(){var t=confirm("Are you sure you want to remove this deck from the cloud?");t&&(c.isDeleting=!0,c.deck["delete"]()["finally"](function(){c.isDeleting=!1,c.$location.update_path("/decks/new")}))},this.createNewDeck=function(){var t=c.DeckFactory.createDeck();t.name="New Deck";var e=c.CardGroupFactory.createCardGroup(),n=c.CardGroupFactory.createCardGroup(),r=c.CardGroupFactory.createCardGroup();return e.name="Mainboard",n.name="Sideboard",r.name="Maybeboard",t.cardGroups=[e,n,r],t},"new"===t.id?(this.deck=this.createNewDeck(),this.updateAuthentication(),this.updateTitle()):this.DeckService.getDeck(t.id).then(function(t){c.deck=t,c.updateAuthentication(),c.updateTitle()}),this.$scope.$on("authentication-changed",this.updateAuthentication)}return t.$inject=["$routeParams","$location","$scope","DeckService","DeckFactory","CardGroupFactory"],t}();angular.module("app").controller("DeckController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="decks/decks.html"}return t}();angular.module("app").directive("decks",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var n=this;this.$scope=t,this.DeckService=e,this.getDecks=function(){var t=n.$scope.user;return t?(n.isSearching=!0,void n.DeckService.getDecksByQuery({owner:t.id}).then(function(t){n.decks=t.sort(function(t,e){return t.name>e.name?1:-1})})["finally"](function(){n.isSearching=!1})):void delete n.decks},this.getDecks(),this.$scope.$on("authentication-changed",this.getDecks)}return t.$inject=["$scope","DeckService"],t}();angular.module("app").controller("DecksController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="pulse/pulse.html"}return t}();angular.module("app").directive("pulse",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="spinner/spinner.html"}return t}();angular.module("app").directive("spinner",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={group:"="},this.templateUrl="statGroup/statGroup.html"}return t}();angular.module("app").directive("statGroup",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={cards:"="},this.templateUrl="stats/statsView.html"}return t}();angular.module("app").directive("stats",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function e(e,n){var r=this;this.unique=function(t,e,n){return n.indexOf(t)===e},this.createStatGroup=function(e,n){var a=new t.StatGroup;a.name=n.name;var i=e.filter(function(t){return n.types.indexOf(t.primaryType)>=0}),c=i.map(function(t){return t.cmc}).filter(r.unique).sort();a.stats=[];for(var o=0;o<=c[c.length-1];++o){var s=new t.Stat;s.name=o.toString(),s.value=i.filter(function(t){return t.cmc===o}).reduce(function(t,e){return t+Number(e.quantity)},0),a.stats.push(s)}return a},this.createStatGroups=function(t,e){return e.map(function(e){return r.createStatGroup(t,e)})},this.updateStats=function(t,e,n){t&&t.length>0?r.statGroups=r.createStatGroups(t,r.categories):r.statGroups=[]},this.categories=n.statCategories,e.$watchCollection("cards",this.updateStats)}return e.$inject=["$scope","config"],e}();angular.module("app").controller("StatsController",e)}(app||(app={}));