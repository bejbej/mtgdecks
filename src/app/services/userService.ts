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

        private mapApiUser = (apiData: IApiUser): IUser => {
            return {
                id: apiData.id
            };
        }

    }

    angular.module("app").service("UserService", UserService);
}