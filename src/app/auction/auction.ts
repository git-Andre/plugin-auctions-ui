export class Auction {

    constructor(
        public id: number,
        public createdAt: number,
        public itemId: number,
        public startDate: any,
        public startHour: number,
        public startMinute: number,
        public auctionDuration: number,
        public startPrice: number,
        public buyNowPrice?: number) {
    }
}
