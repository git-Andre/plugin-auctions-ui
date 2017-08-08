export interface AddAuctionInterface {
    id: number ;
    itemId: number      ;
    startDate: number   ;
    startHour: number ;
    startMinute: number;
    auctionDuration: number;
    startPrice: number ;
    buyNowPrice: number;
    createdAt: number   ;
    updatedAt: number   ;
}