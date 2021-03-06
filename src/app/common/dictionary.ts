module app {
    export class Dictionary {
        public static fromArray = <T>(array: T[], keyFunc: { (item: T): string }): { [id: string]: T } => {
            return array.reduce((dictionary, item) => {
                dictionary[keyFunc(item)] = item;
                return dictionary;
            }, <{ [id: string]: T }>{});
        }

        public static toArray = <T>(dictionary: { [id: string]: T }): T[] => {
            return Object.keys(dictionary).map(key => dictionary[key]);
        }
    }
}