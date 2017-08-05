export class Auction {

    constructor(
        public id: number,
        public itemId: number,
        public startDate: Date,
        public startHour: number,
        public startMinute: number,
        public auctionDuration: number,
        public startPrice: number,
        public buyNowPrice: number,
        public createdAt: number,
        public updatedAt: number ) {
    }
}
