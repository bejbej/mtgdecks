module app {
    export class UserService {

        constructor(
            private $http: ng.IHttpService,
            private config: IConfig
        ) { }

        public getMe = () => {
            return this.$http.post<IApiUser>(this.config.usersUrl + "/me", {}).then(response => {
                return this.mapApiUser(response.data);
            });
        }

        private mapApiUser = (apiData: IApiUser): User => {
            var user = new User();
            user.id = apiData.id;
            return user;
        }

    }

    angular.module("app").service("UserService", UserService);
}