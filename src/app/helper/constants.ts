export const URL_HELPER: object = {url: "https://schaffrathnumis.de"};
// export const URL_HELPER: object = {url: ""};


export const AUTH_HELPER: object = {auth: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVlNjk4ZGMwNTAzYmQ0Y2JiMzIyNmEyNzAzYWQ4MTdlMWQxOTM4Yjk1MjY3NGViZmJjYzY3ZGQ2YWFiYTcyZGVlMzNiZTg5MGY4OTFhMzg5In0.eyJhdWQiOiIxIiwianRpIjoiZWU2OThkYzA1MDNiZDRjYmIzMjI2YTI3MDNhZDgxN2UxZDE5MzhiOTUyNjc0ZWJmYmNjNjdkZDZhYWJhNzJkZWUzM2JlODkwZjg5MWEzODkiLCJpYXQiOjE1MDM0ODg3MzYsIm5iZiI6MTUwMzQ4ODczNiwiZXhwIjoxNTAzNTc1MTM2LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.bG1ZJ4aDo7qDnaY7yULcUPzSopXAMaqgA6N8037SuoZE8l3_NNYXS1BXwLPb1O5B_4Syu2Usq6-13mfPjJJssoGG6AqG6Lwk6YfdgJ391yb8u0mD07mUdswGylBJJ7BOdINewYANC_WjMwDYsCwydtNgcBrK9-6qf0CrfNBjNix3xJmcFWFIowCwUJRH1rnpJwHK0xdkqxTj60Mb9_XGGCNqMC0rMWsIJGZrlRkCSUgzR9pqcJytQ8LBNjJpmUb113TdnjYk3aErCQqXYMqGI0v0k4bzFRXHQJq73-anWotH9HjMybSFcZTgxEbHdKY2lRfkqaC-razTG6olMPX18hi_Rc6_2T2Ym-w61EDgqAgCBLXQS6okbdG_LTfh8_SCso3xDNOcz9BajyPbu3US-fupukRdYR98JwViefRd6s9v5T45WKsi1NvBguBgOMzY6kaysW6NYzhTQB8QnrCG39mG4FpE6Yp2q4VrTMLsKNdW0eFzJK8-QPEddhbZm9sqUBzeJjymht_Z2er1MShJtB6RO5FOGD34kStEINCoAaYypoYSQz6UxmErX3H3zM78746KzCrbX2mpduR6yCzDCbNmLoVuhoWMtIf9EzBrYxAyTDcM5QAwdNcO3gFZsPmyjCjXY0s-51JnjTsu6QC-1dUo6PwJ4OqgjEu4aSrnBuM"};


export const AUCTION_TABLE_HEADER_PROPS: object[] = [
    {caption: 'Artikel ID', width: 8, tooltipText: 'Item ID'},
    {caption: 'Artikel text', width: 300, tooltipText: 'Item Text'},
    {caption: 'Start Datum', width: 8, tooltipText: 'Start date'},
    {caption: 'Auktions Dauer', width: 1, tooltipText: 'Duration'},
    {caption: 'Auktions Ende', width: 1, tooltipText: 'End date'},
    {caption: 'Start Preis', width: 8, tooltipText: 'Start price'},
    {caption: 'Erstellt am', width: 8, tooltipText: 'Created on'},
    {caption: 'Letzte Änderung', width: 30, tooltipText: 'Last Change'},
    {caption: 'Aktionen', width: 120, tooltipText: 'Actions'},
    {caption: 'INFO', width: 120, tooltipText: 'Anzahl Gebote / Höchstgebot'}
];

export const DATE_OPTIONS: object = {
    short: { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' },
    long : { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' },
    shortYearLong : { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' },

    longWeakDay: {
        weekday     : 'short',
        year        : '2-digit',
        month       : '2-digit',
        day         : '2-digit',
        hour        : '2-digit',
        minute      : '2-digit',
        timeZoneName: 'short',

    },
};
