

export class Auction {

    constructor(
        public id: number     = null,
        public itemId: number     = null,
        public startDate: number       = 0,
        public startHour: number       = 19,
        public startMinute: number     = 1,
        public auctionDuration: number = 10,
        public currentPrice: number    = 5.99,
        public createdAt: number       = 0,
        public updatedAt: number       = 0,
        public expiryDate: number   = 0,
        public tense: string = "future",
        public bidderList: Array<any> = []
        ) {  }
}

