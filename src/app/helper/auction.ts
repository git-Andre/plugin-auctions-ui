

export class Auction {

    constructor(
        public id: number     = null,
        public variationId: number     = null,
        public startDate: number       = 0,
        public startHour: number       = 19,
        public startMinute: number     = 1,
        public auctionDuration: number = 10,
        public currentPrice: number    = 5.99,
        public createdAt: number       = 0,
        public updatedAt: number       = 0,
        public expiryDate?: number,
        public isEnded?: boolean,
        public isLive?: boolean,
        public bidderList?: Array<any>,
        ) {
    }
}

