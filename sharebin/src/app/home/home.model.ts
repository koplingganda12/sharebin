export class item {
    constructor(
        public id: string,
        public name: string,
        public address: string,
        public description: string,
        public imageUrl: string
    ) { }
}

export class user {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public items: item[] = []
    ) { }
}