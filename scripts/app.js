angular.module("templates",[]).run(["$templateCache",function(e){e.put("404/404.html",'<div class="margin text-center" style=color:#f5f5f5;><h1>404</h1><span>~(=^..^)</span></div>'),e.put("auth/auth.html",'<div ng-controller="AuthController as vm"><button ng-click=vm.login() ng-if=!vm.isLoggedIn() ng-disabled=vm.isLoggingIn><span ng-if=vm.isLoggingIn>Logging In</span> <span ng-if=!vm.isLoggingIn>Login</span></button> <button ng-click=vm.logout() ng-if=vm.isLoggedIn()>Logout</button></div>'),e.put("cardGroup/cardGroup.html",'<div ng-controller="CardGroupController as vm"><ul class="nav nav-pills" ng-if="vm.canEdit && !vm.isEditing"><li><div ng-click="vm.showToolbar = !vm.showToolbar">{{::vm.cardGroup.name}} <span class=badge>{{::vm.cardGroup.count}}</span> <span class=glyphicon ng-class="{\'glyphicon-chevron-up\': vm.showToolbar, \'glyphicon-chevron-down\': !vm.showToolbar}" ng-if="vm.cardGroup.cards.length > 0"></span></div></li><li><a ng-click=vm.startEditing()>Edit</a></li></ul><ul class="nav nav-tabs" ng-if=vm.isEditing><li><a ng-click=vm.applyChanges()>{{::vm.cardGroup.name}} <span class=badge>{{::vm.cardGroup.count}}</span> <span class=glyphicon ng-class="::{\'glyphicon-chevron-up\': vm.showToolbar, \'glyphicon-chevron-down\': !vm.showToolbar}" ng-if="vm.cardGroup.cards.length > 0"></span></a></li><li class=active><a>Edit</a></li></ul><header ng-if="!vm.canEdit && vm.cardGroup.cards.length === 0"><span>{{::vm.cardGroup.name}}</span> <span class=badge>{{::vm.cardGroup.count}}</span></header><header ng-if="!vm.canEdit && vm.cardGroup.cards.length > 0" ng-click="vm.showToolbar = !vm.showToolbar"><span>{{::vm.cardGroup.name}}</span> <span class=badge>{{::vm.cardGroup.count}}</span> <span class=glyphicon ng-class="{\'glyphicon-chevron-up\': vm.showToolbar, \'glyphicon-chevron-down\': !vm.showToolbar}" ng-if="vm.cardGroup.cards.length > 0"></span></header><div class=radio-group ng-if="vm.cardGroup.cards.length > 0 && !vm.isEditing && vm.showToolbar"><label><input type=radio ng-model=vm.view value=group-by-type ng-click="vm.showToolbar = false"> Card Type</label> <label><input type=radio ng-model=vm.view value=group-by-color ng-click="vm.showToolbar = false"> Color</label> <label><input type=radio ng-model=vm.view value=group-by-cmc ng-click="vm.showToolbar = false"> Converted Mana Cost</label> <label><input type=radio ng-model=vm.view value=group-by-name ng-click="vm.showToolbar = false"> Name</label></div><div class="alert alert-danger margin" ng-if="vm.cardGroup.failedCards.length > 0">Couldn\'t identify the following cards:<ul><li ng-repeat="card in vm.cardGroup.failedCards track by $index">{{::card}}</li></ul></div><div ng-if="!vm.isEditing && vm.cardGroup.cards.length > 0"><directive-container directive=vm.view cards=vm.cardGroup.cards></directive-container></div><form name=vm.form class=margin ng-if=vm.isEditing><textarea class="form-control has-bottom-buttons" placeholder="4x Island" ng-model=vm.cardsBlob ng-model-options="{updateOn: \'blur\'}" msd-elastic></textarea><div class=bottom-buttons><button class="btn btn-default" type=button ng-click=vm.applyChanges()>Apply Changes</button><button class="btn btn-default" type=button ng-click=vm.discardChanges()>Discard Changes</button></div></form></div>'),e.put("cardSet/cardSet.html",'<div class="flex-gte-sm margin" style="margin-top: 0px"><div ng-repeat="column in columns"><div class=card-group ng-repeat="row in ::column"><h3 ng-if=::row.name>{{::row.name}} <span class=badge>{{::row.numberOfCards}}</span></h3><div ng-repeat="card in ::row.cards"><span class=quantity>{{::card.quantity}}</span> <a class=name href={{::card.storeUrl()}} card-preview=card.imageUrl() lightbox=card.imageUrl()>{{::card.name}}</a> <span class=price></span></div></div></div></div>'),e.put("cardSet/groupByName.html",'<div class="flex-gte-sm margin"><div ng-repeat="column in columns"><div class=card-group ng-repeat="row in ::column"><div ng-repeat="card in ::row.cards"><span class=quantity>{{::card.quantity}}</span> <a class=name href={{::card.storeUrl()}} card-preview=card.imageUrl() lightbox=card.imageUrl()>{{::card.name}}</a> <span class=price></span></div></div></div></div>'),e.put("decks/decks.html",'<div ng-controller="DecksController as vm"><nav><div class=select><div class=select-label>{{vm.currentTag || "All"}}<span class=spacer></span><span class="chevron bottom" ng-show="vm.tags.length > 0"></span></div><select ng-model=::vm.currentTag ng-change=::vm.filterDecks() ng-if="vm.tags.length > 0"><option value>- All -</option><option ng-repeat="tag in vm.tags" value={{::tag}}>{{::tag}}&nbsp;&nbsp;</option></select></div><div class=pull-right><ng-include src="\'auth/auth.html\'"></ng-include></div></nav><div class=list-group><a class=list-group-item href=#/decks/new><strong>+</strong> Build a New Deck</a> <a class=list-group-item href=#/decks/{{::deck.id}} ng-repeat="deck in vm.visibleDecks">{{::deck.name}} <span class=badge ng-repeat="tag in ::deck.tags track by $index">{{::tag}}</span></a></div><spinner class=light ng-if=vm.timeout></spinner></div>'),e.put("deck/deck.html",'<div ng-controller="DeckController as vm"><nav><a href=#/decks>My Decks</a><div class=pull-right><ng-include src="\'auth/auth.html\'"></ng-include></div></nav><spinner class=light ng-if=!vm.deck></spinner><div ng-if=vm.deck><section><header class=deck-info><div class=deck-name ng-if=!vm.canEdit>{{vm.deck.name}}</div><input class="form-control deck-name-input" ng-model=vm.deck.name ng-model-options="{updateOn: \'default blur\', debounce: {default: 2000, blur: 0}}" ng-change=vm.save() ng-if=vm.canEdit><div class="flex flex-padding"><a class="btn btn-default margin-top" href={{vm.storeUrl}} target=_blank ng-if="vm.deck.cardGroups[0].cards.length > 0">TCG Player</a><button class="btn btn-default margin-top" ng-click=vm.delete() ng-if="vm.canEdit && vm.deck.id" ng-disabled=vm.isDeleting>{{ vm.isDeleting ? "Deleting" : "Delete this Deck" }}<pulse ng-if=vm.isDeleting></pulse></button></div></header></section><div class=flex-gte-md><section class=flex-2><div ng-repeat="cardGroup in ::vm.deck.cardGroups"><card-group group=cardGroup on-change=vm.cardGroupUpdated can-edit=vm.canEdit is-editing="{{::$index === 0 && vm.deck.id === undefined}}"></card-group></div></section><section class=border-left-gte-md><header>Notes</header><div ng-if="!vm.canEdit && vm.deck.tags.length > 0"><div class=tags><span class=badge ng-repeat="tag in vm.deck.tags">{{tag}}</span></div><hr class=dashed></div><div class=tag-input ng-if=vm.canEdit><input type=text class="tags transparent" placeholder=tags ng-model=vm.deck.tags ng-model-options="{updateOn: \'default blur\', debounce: {default: 2000, blur: 0}}" ng-list ng-change=vm.save()><hr class=dashed><div><span class=badge ng-repeat="tag in vm.deck.tags track by $index">{{tag}}</span></div></div><textarea class=transparent ng-model=vm.deck.notes ng-model-options="{updateOn: \'default blur\', debounce: {default: 2000, blur: 0}}" ng-change=vm.save() ng-disabled=!vm.canEdit allow-tabs msd-elastic></textarea><header>Stats</header><stats cards=vm.deck.cardGroups[0].cards ng-if="vm.deck.cardGroups[0].cards.length > 0"></stats></section></div></div></div>'),e.put("pulse/pulse.html",'<div class="sk-spinner sk-spinner-pulse"></div>'),e.put("spinner/spinner.html",'<div class=sk-fading-circle><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'),e.put("statGroup/statGroup.html",'<div class=stat-group><h3>{{::group.name}}</h3><div class=stat-group-row ng-repeat="stat in group.stats"><span class=name>{{::stat.name}}</span> <span class=bar>{{::"X".repeat(stat.value)}}</span> <span class=value ng-if="stat.value > 0">{{::stat.value}}</span></div></div>'),e.put("stats/statsView.html",'<div class=margin style=margin-top:0px; ng-controller="StatsController as vm"><div class=row ng-if="vm.statGroups.length > 0"><div class=col-xs-12><stat-group group=vm.statGroups[0]></stat-group></div></div></div>')}]);var app;!function(e){angular.module("app",["templates","ngRoute","ngLocationUpdate","satellizer","monospaced.elastic"])}(app||(app={}));var app;!function(e){angular.module("app").constant("config",appConfig),angular.module("app").constant("cards",cardsCSV.split("\n").slice(1).reduce(function(e,t){var n=t.split("\t"),r={name:n[0],primaryType:n[1],cmc:Number(n[2]),color:n[3],multiverseId:n[4]};return e[r.name.toLowerCase()]=r,e},{})),angular.module("app").config(["$authProvider","config",function(e,t){e.google({clientId:t.authClients.google.clientId,url:t.authClients.google.authUrl})}]),angular.module("app").config(["SatellizerConfig","config",function(e,t){e.tokenPrefix=t.localStorage.prefix}]),angular.module("app").run(["config","$http","$q","$auth",function(e,t,n,r){var a=localStorage.getItem("api-key");a&&(t.defaults.headers.common["Api-Key"]=a,r.isAuthenticated=function(){return!0},r.logout=function(){return n.reject()},r.authenticate=function(){return n.reject()})}]);var t=void 0,n=function(){void 0===t?t=new Date:(new Date).getTime()-t.getTime()<100?(appConfig.enableHover=!0,document.body.removeEventListener("mouseover",n),document.body.addEventListener("touchstart",r)):t=new Date},r=function(){appConfig.enableHover=!1,document.body.removeEventListener("touchstart",r),document.body.addEventListener("mouseover",n)};r()}(app||(app={}));var app;!function(e){var t=function(){function e(e){e.when("/decks/:id",{templateUrl:"deck/deck.html"}).when("/decks",{templateUrl:"decks/decks.html",name:"My Decks",pageSize:"sm"}).when("/",{redirectTo:"/decks"}).otherwise({templateUrl:"404/404.html",name:"Page Not Found"})}return e.$inject=["$routeProvider"],e}();angular.module("app").config(t),angular.module("app").run(["$rootScope",function(e){e.$on("$routeChangeSuccess",function(t,n){e.pageSize=n.pageSize,n.name&&(document.title=n.name)})}])}(app||(app={}));var app;!function(e){var t=function(){function e(){}return e}();e.CardSet=t}(app||(app={}));var app;!function(e){var t=function(){function e(){var e=this;this.exec=function(t,n,r){for(var a=t.map(r),i=e.generateReferenceArray(a),c=[a.length],o=a.reduce(function(e,t){return e+t});;){var s=e.split(i,o-1);if(void 0===s)break;if(s.groupSizes.length>n)break;c=s.groupSizes,o=s.largestSize}var u=0;return c.map(function(e){var n=t.slice(u,u+e);return u+=e,n})},this.generateReferenceArray=function(e){for(var t=[],n=0;n<e.length;++n){var r=0,a=[];t.push(a);for(var i=n;i<e.length;++i)r+=e[i],a.push(r)}return t},this.split=function(e,t){for(var n=[],r=0,a=0;a<e.length;){var i=e[a];if(i[0]>t)return;for(var c=0;c<i.length-1&&!(i[c+1]>t);++c);r=i[c]>r?i[c]:r,n.push(c+1),a=a+c+1}return{groupSizes:n,largestSize:r}}}return e}();e.GroupEvenly=t}(app||(app={}));var app;!function(e){var t=function(){function e(){}return e}();e.Stat=t}(app||(app={}));var app;!function(e){var t=function(){function e(){}return e}();e.StatGroup=t}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="A",this.link=function(e,t){t.bind("keydown",function(e){if(9===e.keyCode){e.preventDefault();var t=e.target,n=t.selectionStart,r=t.selectionEnd,a=t.value;t.value=a.substring(0,n)+"\t"+a.substring(r),t.selectionStart=n+1,t.selectionEnd=t.selectionStart}})}}return e}();angular.module("app").directive("allowTabs",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(e){var t=this;this.config=e,this.getOffset=function(e){var t=e.getBoundingClientRect(),n=window.pageXOffset||document.documentElement.scrollLeft,r=window.pageYOffset||document.documentElement.scrollTop;return{top:t.top+r,left:t.left+n}},this.showCardPreview=function(e,n){var r=document.getElementById("card-preview");r||(r=document.createElement("img"),r.id="card-preview",document.body.appendChild(r));var a=t.getOffset(e.currentTarget);r.style.top=a.top-100+"px",r.style.left=a.left+e.currentTarget.offsetWidth+20+"px",r.src=n},this.hideCardPreview=function(){var e=document.getElementById("card-preview");e&&(e.src="",e.style.top="-300px",e.style.left="-200px")},this.restrict="A",this.link=function(e,n,r){var a,i=function(n){t.config.enableHover&&(a||(a=e.$eval(r.lightbox)),t.showCardPreview(n,a))},c=function(e){t.config.enableHover&&t.hideCardPreview()};n[0].addEventListener("mouseover",i),n[0].addEventListener("mouseleave",c),e.$on("$destroy",function(){t.hideCardPreview(),n[0].removeEventListener("mouseover",i),n[0].removeEventListener("mousleave",c)})}}return e}();angular.module("app").directive("cardPreview",["config",function(e){return new t(e)}])}(app||(app={}));var app;!function(e){var t=function(){function e(e){var t=this;this.$compile=e,this.restrict="E",this.link=function(e,n,r){e.$watch(r.directive,function(a){var i=Object.keys(r).reduce(function(e,t){if("$"!==t[0]&&"directive"!==t){var n=t+'="'+r[t]+'"';e.push(n)}return e},[]).join(" "),c="<"+a+" "+i+"></"+a+">",o=t.$compile(c)(e);n[0].firstChild&&n[0].firstChild.remove(),n.append(o)})}}return e}();angular.module("app").directive("directiveContainer",["$compile",function(e){return new t(e)}])}(app||(app={}));var app;!function(e){var t=function(){function e(){var e=this;this.showLightbox=function(e,t){var n=document.createElement("div");n.className="lightbox";var r=document.createElement("img");r.src=t,n.appendChild(r),n.addEventListener("click",function(e){n.remove()}),document.body.appendChild(n),e.preventDefault()},this.restrict="A",this.link=function(t,n,r){var a;n[0].addEventListener("click",function(n){a||(a=t.$eval(r.lightbox)),e.showLightbox(n,a)})}}return e}();angular.module("app").directive("lightbox",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(t){var n=this;this.config=t,this.imageUrl=function(){if(void 0!=n._imageUrl)return n._imageUrl;var t=e._pattern.exec(n.config.imagesUrl);return null===t?(n._imageUrl="",n._imageUrl):(n._imageUrl=n.config.imagesUrl.replace(e._pattern,n[t[1]]),n._imageUrl)},this.storeUrl=function(){return n.config.storeUrl+n.name.replace(/ /g,"+")}}return e._pattern=/{([^}]*)}/,e}();e.Card=t}(app||(app={}));var app;!function(e){var t=function(){function e(e){var t=this;this.CardService=e,this.setCardBlob=function(e){var n=t.parseCardBlob(e);t.failedCards=n.failed,t.cards=n.cards,t.cardBlob=t.failedCards.concat(t.cards.map(function(e){return e.quantity+"x "+e.name}).sort()).join("\n"),t.count=t.cards.reduce(function(e,t){return e+Number(t.quantity)},0)},this.parseCardBlob=function(e){if(e=e.trim(),0===e.length)return{cards:[],failed:[]};var n=e.split(/\n[\s\n]*/).reduce(function(e,n){var r=/^(?:(\d+)[Xx]?\s)?\s*([^0-9]+)$/.exec(n.trim());if(null===r)e.failed.push(n);else{var a=t.CardService.getCard(r[2]);null==a?e.failed.push(n):(a.quantity=Number(r[1]||1),e.cards.push(a))}return e},{cards:[],failed:[]});if(n.failed=n.failed.sort(),n.cards.length>1){var r=n.cards.reduce(function(e,t){return void 0===e[t.name]?e[t.name]=t:e[t.name].quantity+=t.quantity,e},{});n.cards=Object.keys(r).sort().map(function(e){return r[e]})}return n},this.name="",this.cardBlob=""}return e}();e.CardGroup=t}(app||(app={}));var app;!function(e){var t=function(){function e(e,t){var n=this;this.$q=e,this.DeckService=t,this.save=function(){return n.id?n.DeckService.updateDeck(n):n.DeckService.createDeck(n).then(function(e){n.id=e})},this["delete"]=function(){return n.id?n.DeckService.deleteDeck(n.id).then(function(){n.id=void 0}):n.$q.reject()}}return e}();e.Deck=t}(app||(app={}));var app;!function(e){var t=function(){function e(){}return e}();e.User=t}(app||(app={}));var app;!function(e){var t=function(){function e(e,t,n,r){var a=this;this.$auth=e,this.$rootScope=t,this.config=n,this.UserService=r,this.login=function(){return a.$auth.authenticate("google").then(function(){return a.UserService.getMe().then(function(e){return localStorage.setItem(a.config.localStorage.user,JSON.stringify(e)),a.updateAuthenticationStatus(),e},a.logout)})},this.logout=function(){return a.$auth.logout().then(function(){localStorage.removeItem(a.config.localStorage.user),localStorage.removeItem(a.config.localStorage.tags),a.updateAuthenticationStatus()})},this.isLoggedIn=function(){return!!a.$auth.isAuthenticated()||void(a.isAuthenticated&&a.logout())},this.getAuthUser=function(){var e=void 0;if(a.$auth.isAuthenticated()){var e=JSON.parse(localStorage.getItem(a.config.localStorage.user));void 0===e&&a.logout()}else a.isAuthenticated&&a.logout();return e},this.updateAuthenticationStatus=function(){a.isAuthenticated=a.$auth.isAuthenticated(),a.$rootScope.$broadcast("authentication-changed")},this.isAuthenticated=this.$auth.isAuthenticated(),this.isAuthenticated||this.logout()}return e.$inject=["$auth","$rootScope","config","UserService"],e}();e.AuthService=t,angular.module("app").service("AuthService",t)}(app||(app={}));var app;!function(e){var t=function(){function t(e){this.$injector=e}return t.$inject=["$injector"],t.prototype.createCard=function(){return new e.Card(this.$injector.get("config"))},t}();e.CardFactory=t,angular.module("app").service("CardFactory",t)}(app||(app={}));var app;!function(e){var t=function(){function t(e){this.$injector=e}return t.$inject=["$injector"],t.prototype.createCardGroup=function(){return new e.CardGroup(this.$injector.get("CardService"))},t}();e.CardGroupFactory=t,angular.module("app").service("CardGroupFactory",t)}(app||(app={}));var app;!function(e){var t=function(){function e(e,t){var n=this;this.CardFactory=e,this.cards=t,this.getCard=function(e){var t=n.cards[e.toLowerCase()];if(void 0===t)return null;var r=n.CardFactory.createCard();return angular.merge(r,t)}}return e.$inject=["CardFactory","cards"],e}();e.CardService=t,angular.module("app").service("CardService",t)}(app||(app={}));var app;!function(e){var t=function(){function t(e){this.$injector=e}return t.$inject=["$injector"],t.prototype.createDeck=function(){return new e.Deck(this.$injector.get("$q"),this.$injector.get("DeckService"))},t}();e.DeckFactory=t,angular.module("app").service("DeckFactory",t)}(app||(app={}));var app;!function(e){var t=function(){function e(e,t,n,r){var a=this;this.$http=t,this.DeckFactory=n,this.CardGroupFactory=r,this.getDeck=function(e,t){return a.$http.get(a.url+"/"+e,{timeout:t}).then(function(e){return a.mapApiDeck(e.data)})},this.getDecksByQuery=function(e,t){return a.$http.get(a.url,{params:e,timeout:t}).then(function(e){return e.data.results})},this.createDeck=function(e){return a.$http.post(a.url,a.mapDeck(e)).then(function(e){return e.data.id})},this.updateDeck=function(e){return a.$http.put(a.url+"/"+e.id,a.mapDeck(e))},this.deleteDeck=function(e){return a.$http["delete"](a.url+"/"+e)},this.mapApiDeck=function(e){var t=a.DeckFactory.createDeck();return t.id=e.id,t.name=e.name,t.owners=e.owners,t.cardGroups=e.cardGroups.map(function(e){var t=a.CardGroupFactory.createCardGroup();return t.name=e.name,t.setCardBlob(e.cardBlob),t}),t.notes=e.notes,t.tags=e.tags,t},this.mapDeck=function(e){return{id:void 0,owners:void 0,name:e.name,cardGroups:e.cardGroups.map(function(e){return{name:e.name,cardBlob:e.cardBlob}}),notes:e.notes,tags:e.tags}},this.url=e.decksUrl}return e.$inject=["config","$http","DeckFactory","CardGroupFactory"],e}();e.DeckService=t,angular.module("app").service("DeckService",t)}(app||(app={}));var app;!function(e){var t=function(){function t(t,n){var r=this;this.$http=t,this.config=n,this.getMe=function(){return r.$http.post(r.config.usersUrl+"/me",{}).then(function(e){return r.mapApiUser(e.data)})},this.mapApiUser=function(t){var n=new e.User;return n.id=t.id,n}}return t.$inject=["$http","config"],t}();e.UserService=t,angular.module("app").service("UserService",t)}(app||(app={}));var app;!function(e){var t=function(){function e(e){var t=this;this.AuthService=e,this.login=function(){return t.isLoggingIn=!0,t.AuthService.login()["finally"](function(){t.isLoggingIn=!1})},this.logout=function(){return t.AuthService.logout()},this.isLoggedIn=function(){return t.AuthService.isLoggedIn()}}return e.$inject=["AuthService"],e}();angular.module("app").controller("AuthController",t)}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.scope={canEdit:"=",group:"=",onChange:"=",isEditing:"@"},this.templateUrl="cardGroup/cardGroup.html"}return e}();angular.module("app").directive("cardGroup",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(e,t){var n=this;this.$scope=e,this.view="group-by-type",this.updateEditability=function(){n.canEdit=n.$scope.canEdit,n.$scope.canEdit||n.discardChanges()},this.startEditing=function(){n.cardsBlob=n.cardGroup.cardBlob,n.isEditing=!0},this.applyChanges=function(){n.form.$dirty&&(n.cardGroup.setCardBlob(n.cardsBlob),n.onChange&&n.onChange(n.cardGroup)),n.isEditing=!1},this.discardChanges=function(){n.isEditing=!1},this.isEmpty=function(){return n.cardGroup.cards.length+(n.cardGroup.failedCards||[]).length===0},this.cardGroup=this.$scope.group,this.onChange=this.$scope.onChange,this.updateEditability(),this.$scope.$watch("canEdit",this.updateEditability),"true"===this.$scope.isEditing?this.startEditing():this.discardChanges()}return e.$inject=["$scope","config"],e}();angular.module("app").controller("CardGroupController",t)}(app||(app={}));var app;!function(e){var t=function(){function t(){var t=this;this.groupByCmc=function(t){var n=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],r=n.reduce(function(n,r){var a=new e.CardSet;return a.name=r.toString()+" drop",a.cards=t.filter(function(e){return e.cmc===r}),a.numberOfCards=a.cards.reduce(function(e,t){return e+t.quantity},0),a.cards.length>0&&n.push(a),n},[]);return(new e.GroupEvenly).exec(r,3,function(e){return e.cards.length+4})},this.restrict="E",this.scope={cards:"="},this.templateUrl="cardSet/cardSet.html",this.link=function(e){e.$watchCollection("cards",function(n){e.columns=t.groupByCmc(n)})}}return t}();angular.module("app").directive("groupByCmc",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function t(){var t=this;this.groupByColor=function(t){var n=["white","blue","black","red","green","multicolored","colorless"],r=n.reduce(function(n,r){var a=new e.CardSet;return a.name=r,a.cards=t.filter(function(e){return e.color===r}),a.numberOfCards=a.cards.reduce(function(e,t){return e+t.quantity},0),a.cards.length>0&&n.push(a),n},[]);return(new e.GroupEvenly).exec(r,3,function(e){return e.cards.length+4})},this.restrict="E",this.scope={cards:"="},this.templateUrl="cardSet/cardSet.html",this.link=function(e){e.$watchCollection("cards",function(n){e.columns=t.groupByColor(n)})}}return t}();angular.module("app").directive("groupByColor",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){var e=this;this.letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),this.groupByName=function(e){var e=e.sort(function(e,t){return e.name>t.name?1:-1}),t=Math.ceil(e.length/3);return[[{name:void 0,numberOfCards:void 0,cards:e.slice(0,t)}],[{name:void 0,numberOfCards:void 0,cards:e.slice(t,t+t)}],[{name:void 0,numberOfCards:void 0,cards:e.slice(t+t)}]]},this.restrict="E",this.scope={cards:"="},this.templateUrl="cardSet/groupByName.html",this.link=function(t){t.$watchCollection("cards",function(n){t.columns=e.groupByName(n)})}}return e}();angular.module("app").directive("groupByName",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function t(){var t=this;this.groupByType=function(t){var n=["creature","artifact","enchantment","planeswalker","land","instant","sorcery"],r=n.reduce(function(n,r){var a=new e.CardSet;return a.name=r,a.cards=t.filter(function(e){return e.primaryType===r}),a.numberOfCards=a.cards.reduce(function(e,t){return e+t.quantity},0),a.cards.length>0&&n.push(a),n},[]);return(new e.GroupEvenly).exec(r,3,function(e){return e.cards.length+4})},this.restrict="E",this.scope={cards:"="},this.templateUrl="cardSet/cardSet.html",this.link=function(e){e.$watchCollection("cards",function(n){e.columns=t.groupByType(n)})}}return t}();angular.module("app").directive("groupByType",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.templateUrl="decks/decks.html"}return e}();angular.module("app").directive("decks",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(e,t,n,r,a){var i=this;this.$q=e,this.$scope=t,this.AuthService=n,this.config=r,this.DeckService=a,this.getDecks=function(){i.timeout=i.$q.defer();var e=i.AuthService.getAuthUser();i.DeckService.getDecksByQuery({owner:e.id},i.timeout.promise).then(function(e){i.decks=e.sort(function(e,t){return e.name>t.name?1:-1}),i.tags=e.reduce(function(e,t){return t.tags.forEach(function(t){t=t.toLocaleLowerCase(),e.indexOf(t)===-1&&e.push(t)}),e},[]),i.tags.indexOf(i.currentTag)<0&&delete i.currentTag,i.filterDecks()})["finally"](function(){delete i.timeout})},this.filterDecks=function(){return i.syncTags(),i.currentTag?void(i.visibleDecks=i.decks.filter(function(e){return e.tags.some(function(e){return e.toLocaleLowerCase()===i.currentTag.toLocaleLowerCase()})})):void(i.visibleDecks=i.decks)},this.sync=function(){var e=i.AuthService.getAuthUser();void 0===e&&(i.cancelPendingRequests(),delete i.decks,delete i.visibleDecks,delete i.tags,delete i.currentTag),void 0!==e&&void 0===i.decks&&i.getDecks()},this.syncTags=function(){void 0===i.tags&&localStorage.removeItem(i.config.localStorage.tags);var e={all:i.tags,current:i.currentTag};localStorage.setItem(i.config.localStorage.tags,JSON.stringify(e))},this.cancelPendingRequests=function(){i.timeout&&i.timeout.resolve()},this.sync(),this.$scope.$on("authentication-changed",this.sync),this.$scope.$on("$destroy",this.cancelPendingRequests);var c=JSON.parse(localStorage.getItem(this.config.localStorage.tags));c&&(this.tags=c.all,this.currentTag=c.current)}return e.$inject=["$q","$scope","AuthService","config","DeckService"],e}();angular.module("app").controller("DecksController",t)}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.scope={id:"="},this.templateUrl="deck/deck.html"}return e}();angular.module("app").directive("deck",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(e,t,n,r,a,i,c,o,s){var u=this;this.$location=t,this.$q=n,this.$scope=r,this.config=a,this.AuthService=i,this.DeckService=c,this.DeckFactory=o,this.CardGroupFactory=s,this.updateTitle=function(){document.title=u.deck.name},this.sync=function(){var e=u.AuthService.getAuthUser();u.canCreate=void 0!==e,u.canEdit=!u.deck.id||e&&u.deck.owners.indexOf(e.id)>=0,u.canCreate&&!u.deck.id&&u.deck.cardGroups.some(function(e){return e.cards.length>0})&&u.save()},this.cardGroupUpdated=function(e){0===u.deck.cardGroups.indexOf(e)&&u.updateStoreUrl(),u.save()},this.updateStoreUrl=function(){u.storeUrl=u.config.storeMassEntryUrl+"?c="+u.deck.cardGroups[0].cards.map(function(e){return e.quantity+" "+e.name}).join("||")},this.save=function(){u.updateTitle();var e=u.AuthService.getAuthUser();void 0!==e&&(u.isSaving=!0,u.deck.save().then(function(){u.deck.owners=u.deck.owners||[e.id],u.$location.update_path("/decks/"+u.deck.id)})["finally"](function(){u.isSaving=!1}))},this["delete"]=function(){var e=confirm("Are you sure you want to delete this deck?");e&&(u.isDeleting=!0,u.deck["delete"]().then(function(){location.hash="/decks"})["finally"](function(){u.isDeleting=!1}))},this.getDeck=function(e){return"new"===e?u.$q.when(u.createNewDeck()):(document.title="Loading",u.timeout=u.$q.defer(),u.DeckService.getDeck(e,u.timeout.promise).then(function(e){return e})["finally"](function(){delete u.timeout}))},this.createNewDeck=function(){var e=u.DeckFactory.createDeck();e.name="New Deck";var t=u.CardGroupFactory.createCardGroup(),n=u.CardGroupFactory.createCardGroup();return t.name="Mainboard",n.name="Sideboard",e.cardGroups=[t,n],e.notes="",e},this.cancelPendingRequests=function(){u.timeout&&u.timeout.resolve()},this.getDeck(e.id).then(function(e){u.deck=e,u.sync(),u.updateTitle(),u.updateStoreUrl()}),this.$scope.$on("authentication-changed",this.sync),this.$scope.$on("$destroy",this.cancelPendingRequests)}return e.$inject=["$routeParams","$location","$q","$scope","config","AuthService","DeckService","DeckFactory","CardGroupFactory"],e}();angular.module("app").controller("DeckController",t)}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.templateUrl="pulse/pulse.html"}return e}();angular.module("app").directive("pulse",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.templateUrl="spinner/spinner.html"}return e}();angular.module("app").directive("spinner",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.scope={group:"="},this.templateUrl="statGroup/statGroup.html"}return e}();angular.module("app").directive("statGroup",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function e(){this.restrict="E",this.scope={cards:"="},this.templateUrl="stats/statsView.html"}return e}();angular.module("app").directive("stats",function(){return new t})}(app||(app={}));var app;!function(e){var t=function(){function t(t,n){var r=this;this.unique=function(e,t,n){return n.indexOf(e)===t},this.createStatGroup=function(t,n){var a=new e.StatGroup;a.name=n.name;var i=t.filter(function(e){return n.types.indexOf(e.primaryType)>=0}),c=i.map(function(e){return e.cmc}).filter(r.unique).sort();a.stats=[];for(var o=0;o<=c[c.length-1];++o){var s=new e.Stat;s.name=o.toString(),s.value=i.filter(function(e){return e.cmc===o}).reduce(function(e,t){return e+Number(t.quantity)},0),a.stats.push(s)}return a},this.createStatGroups=function(e,t){return t.map(function(t){return r.createStatGroup(e,t)})},this.updateStats=function(e,t,n){e&&e.length>0?r.statGroups=r.createStatGroups(e,r.categories):r.statGroups=[]},this.categories=n.statCategories,t.$watchCollection("cards",this.updateStats)}return t.$inject=["$scope","config"],t}();angular.module("app").controller("StatsController",t)}(app||(app={}));