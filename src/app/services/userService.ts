module app {
    export class UserService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private config: IConfig
        ) { }

        public getMe = () => {
            var deferred = this.$q.defer();

            this.$http.post<IApiUser>(this.config.usersUrl + "/me", {}).then(response => {
                deferred.resolve(this.mapApiUser(response.data));
            });

            return deferred.promise;
        }

        private mapApiUser = (apiData: IApiUser): User => {
            var user = new User();
            user.id = apiData.id;
            return user;
        }

    }

    angular.module("app").service("UserService", UserService);
}