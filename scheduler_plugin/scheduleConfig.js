// PLEASE MIND
// The MAX_ALERT must be === SCHEDULE_CONFIG.length

/*
Example:

A user comes in at 5:30 PM today and abandons their checkout. 
The E-commerce provider's backend triggers a call to your pre-defined webhook with details of the checkout.
Your app has a predefined schedule as follows (T = Time of checkout abandonment)

1) T + 30 minutes (The first message should be sent after 30 minutes have elapsed since the checkout was abandoned)
2) T + 1 day (Second message should be sent after 1 day has elapsed since the checkout was abandoned)
3) T + 3 days (The third message should be sent after 3 days have elapsed since the checkout was abandoned)

If a user places an order, subsequent messages should not be sent, i.e. if a cart was abandoned on 1 July, and the same customer places an order on 3 July, the third message should not be sent.


// schedule config should be 

export const MAX_ALERT_ALLOWED = 3;
export const SCHEDULE_CONFIG = [{
        "timeframe":"minutes",
        "value": 30
    }, {
        "timeframe":"days",
        "value": 1
    }, {
        "timeframe":"days",
        "value": 3
    }
]
*/


// Also time should in ASCENDING order

export const SCHEDULE_CONFIG = [{
        "timeframe":"minutes",
        "value": 1
    }, {
        "timeframe":"minutes",
        "value": 2
    }, {
        "timeframe":"minutes",
        "value": 3
    }
]

export const MAX_ALERT_ALLOWED = SCHEDULE_CONFIG.length;
