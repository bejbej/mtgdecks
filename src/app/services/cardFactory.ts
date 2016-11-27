module app {
    export class CardFactory {

        constructor(private $injector: ng.auto.IInjectorService) { }

        public createCard(): Card {
            return new Card(this.$injector.get<IConfig>("config"));
        }
    }

    angular.module("app").service("CardFactory", CardFactory);
}