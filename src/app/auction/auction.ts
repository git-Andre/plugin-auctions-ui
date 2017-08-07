export class Auction {

    constructor(
        public id: number = null,
        public itemId: number = null,
        public startDate: number = null,
        public startHour: number = 19,
        public startMinute: number = 1,
        public auctionDuration: number = 10,
        public startPrice: number = 1.99,
        public buyNowPrice: number = 0,
        public createdAt: number = null,
        public updatedAt: number = null ) {
    }
}
