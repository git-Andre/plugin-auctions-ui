export const URL_HELPER: object = {url: "https://schaffrathnumis.de"};
// export const URL_HELPER: object = {url: ""};


export const AUTH_HELPER: object = {auth: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA2M2VkZmFlZjgwZDViY2JmN2UyYTg3NjczY2Q0NDMwNGFmZmRhM2Y0NGE5MWM2MjhiY2I3OWMwMTIzZTY0MDZhYmE0OTEzNjNlZmY4NmIyIn0.eyJhdWQiOiIxIiwianRpIjoiMDYzZWRmYWVmODBkNWJjYmY3ZTJhODc2NzNjZDQ0MzA0YWZmZGEzZjQ0YTkxYzYyOGJjYjc5YzAxMjNlNjQwNmFiYTQ5MTM2M2VmZjg2YjIiLCJpYXQiOjE1MDI0NDU1OTQsIm5iZiI6MTUwMjQ0NTU5NCwiZXhwIjoxNTAyNTMxOTk0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.Iip4kX3GP6rcKbw8fqu2ITSo2wI8533spldOJj4_mwM35aTKCSdtb_Dz84NO-D_iho3IcrPKe_qCrMo2DkZbH27lZecuSl5XoRRlpA9sZNapDT9NjLpVo1Ob16AtES6petpP32t07UD82iPIKWqYzwKRGkr4cZ3JkMORpB-kzzHL3AWhXVJIvNfp1jobs4dAiuvJARuaOYSOfbN9-i8xIAO-SUJk1i7l2glSBLZD1Q2QyhTn9DwgvH0ul3wfmsQJlDB3HdlVDKXDv80ywNfyDZzIn7B_UMidhNiJELjPF5g2pYaPAR-AajGlCsH3AJPevTDSTVSJBJhAC82UM9SGH7wlcoWayRHPoOcD1yVC4KGiCLAXUx3QwFP_BQhrTWYGHDplh0s66okraUnvAtPRY1YfES3R6qnBCpp1elKnbInribx82jZxQKcZdUCTQ6VQiKQR68J9Bg_2sfw1CDtSt2h9jmJSkc5Y9k_ZU-o7EpMTOpzMoDpEIYux75FzlqPi8-kwUXacmnC8fAvbJPZxeilRpTFVQ6BLtB5HFiMSbhf0-K_xUp4n0rpofkp1ms6k2lNIojJNo5HxIJMoxPbcBQX1UjdIq04SgQuqdE0zaNM5jCXagESN0BwEiNimPsWBG64n1d3CLiCEtGFzIY4z5wtJ_P6kUlg5r_IkFVYr4zE"};


export const AUCTION_TABLE_HEADER_PROPS: object[] = [
    {caption: 'Varianten ID', width: 8, tooltipText: 'Varianten ID'},
    {caption: 'Artikel text', width: 300, tooltipText: 'Item Text'},
    {caption: 'Start Datum', width: 8, tooltipText: 'Start date'},
    {caption: 'Auktions Dauer', width: 1, tooltipText: 'Duration'},
    {caption: 'Auktions Ende', width: 1, tooltipText: 'End date'},
    {caption: 'Start Preis', width: 8, tooltipText: 'Start price'},
    {caption: 'Erstellt am', width: 8, tooltipText: 'Created on'},
    {caption: 'Letzte Änderung', width: 30, tooltipText: 'Last Change'},
    {caption: 'Aktionen', width: 120, tooltipText: 'Actions'}
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
