import { Auction } from '../auction/auction';

export const AUCTIONS: Auction[] = [
    {
        id             : 1,
        createdAt      : 10000,
        itemId         : 1605,
        startDate      : 12000,
        startHour      : 19,
        startMinute    : 1,
        auctionDuration: 10,
        startPrice     : 5.99,
        buyNowPrice    : 9.99,
    },
    {
        id             : 2,
        createdAt      : 20000,
        itemId         : 5226,
        startDate      : 22000,
        startHour      : 19,
        startMinute    : 2,
        auctionDuration: 7,
        startPrice     : 1.99,
        buyNowPrice    : 0,
    },
    {
        id             : 3,
        createdAt      : 30000,
        itemId         : 6019,
        startDate      : 32000,
        startHour      : 18,
        startMinute    : 0,
        auctionDuration: 30,
        startPrice     : 22.99,
        buyNowPrice    : 45.99,
    }
];
