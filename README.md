# Abandoned checkout recovery plugin
Schedules alerts to client that remind them to complete their payment for completion of orders in a e-commerce site

# Client Side ScreenShot
[![Screenshot-2022-10-24-at-7-03-46-PM.png](https://i.postimg.cc/t4RR1d2N/Screenshot-2022-10-24-at-7-03-46-PM.png)](https://postimg.cc/tYfGw60s)

# Technology Used
1. ExpressJs - Backend - REST ENDPOINTS
2. ReactJs - FrontEnd Client
3. NodeJs - Cron scheduler

# How its working in a nutshell

  - The system receives a POST rest api (Body object reference shared at the end of this file) whenever a abandoned webevent is called (outside the scope of the requirement)
  - A new alert job object is created which also contains the future alert dates and stored in the DB.
  - A cron job keeps on running that check for a condition if the current Date and time exceeds the future date time value stores in each alert job object
  - When ever the condition is met the alert jobs get updated to keep track of how many more alerts are allowed 
  - When a alert job object completes its task, or the order status is changed to complete, the corresponding alert job object is removed.

# To configure the scheduler 
  - open scheduleConfig.js
  - modify the configuration object to whenever required
  
# Before you start the project
    1. proxy value is defined in the package.json in both backend and frontend code.
    2. Please change it to some other port 8001 (default api port)  && 3000 (default client port) are busy in your machine
  
  
# To run the project in your machine

  - git clone the repo into your local machine desired directory
  - go inside the main root file i.e schedule_plugin directory
  
  - open the terminal in the main root file i.e schedule_plugin directory and type:
  - npm i install
  - cd client
  - npm i install
          
  - to run the backend open a terminal to the main root file i.e schedule_plugin directory and type:
  - npm run start
  
  - to run the front end open a terminal to the main root file i.e schedule_plugin directory and type:
  - cd client
  - npm run start
  

# Public Rest Endpoints

// this endpoint is used to feed the abandoned url data to the system

1. POST REQUEST: http://localhost:PORT/abandoned

    // Reference body of the request
      {
         "abandoned_checkout_url": "https://www.snowdevil.ca/14168/checkouts/0123456789abcdef0456456789abcdef/recover?key=6dacd6065bb80268bda857ee",
        "billing_address": {
          "address1": "Chestnut Street 92",
          "address2": "",
          "city": "Louisville",
          "company": null,
          "country": "United States",
          "country_code": "US",
          "default": true,
          "first_name": "Greg",
          "id": 207119551,
          "last_name": "Piotrowski",
          "name": "Greg Piotrowski",
          "phone": "555-625-1199",
          "province": "Kentucky",
          "province_code": "KY",
          "zip": "40202"
        },
        "buyer_accepts_marketing": false,
        "buyer_accepts_sms_marketing": false,
        "cart_token": "0123456789abcdef0456456789abcdef",
        "closed_at": null,
        "completed_at": null,
        "created_at": "2008-01-10T11:00:00-05:00",
        "currency": {
          "currency": "USD"
        },
        "customer": {
          "accepts_marketing": false,
          "created_at": "2012-03-13T16:09:55-04:00",
          "email": "bob.norman@mail.example.com",
          "first_name": "Bob",
          "id": 207119551,
          "last_name": "Norman",
          "note": null,
          "orders_count": "0",
          "state": null,
          "total_spent": "0.00",
          "updated_at": "2012-03-13T16:09:55-04:00",
          "tags": "tagcity"
        },
        "customer_locale": "fr",
        "device_id": 1,
        "discount_codes": [
          {
            "discount_code": {
              "id": 507328175,
              "code": "WINTERSALE20OFF",
              "usage_count": 0,
              "created_at": "2017-09-25T19:32:28-04:00",
              "updated_at": "2017-09-25T19:32:28-04:00"
            }
          }
        ],
        "email": "bob.norman@mail.example.com",
        "gateway": "authorize_net",
        "id": 450789469,
        "landing_site": "http://www.example.com?source=abc",
        "line_items": {
          "fulfillment_service": "manual",
          "grams": 400,
          "price": "214.00",
          "product_id": 431300801,
          "quantity": 4,
          "requires_shipping": true,
          "sku": "SKU123",
          "title": "Jib",
          "variant_id": 233402193,
          "variant_title": "Green",
          "vendor": "Ottawa Sail Shop"
        },
        "location_id": 1,
        "note": null,
        "phone": {
          "phone": "+13125551212"
        },
        "presentment_currency": {
          "presentment_currency": "USD"
        },
        "referring_site": "http://www.anexample.com",
        "shipping_address": {
          "address1": "Chestnut Street 92",
          "address2": "Apt 2",
          "city": "Louisville",
          "company": null,
          "country": "United States",
          "first_name": "Bob",
          "last_name": "Norman",
          "latitude": "45.41634",
          "longitude": "-75.6868",
          "phone": "555-625-1199",
          "province": "Kentucky",
          "zip": "40202",
          "name": "Bob Norman",
          "country_code": "US",
          "province_code": "KY"
        },
        "sms_marketing_phone": "+15555555555",
        "shipping_lines": {
          "code": "Free Shipping",
          "price": "0.00",
          "source": "shopify",
          "title": "Free Shipping"
        },
        "source_name": "web",
        "subtotal_price": "398.00",
        "tax_lines": {
          "price": "11.94",
          "rate": 0.06,
          "title": "State Tax",
          "channel_liable": true
        },
        "taxes_included": false,
        "token": "b1946ac92492d2347c6235b4d2611184",
        "total_discounts": "0.00",
        "total_duties": "105.31",
        "total_line_items_price": "398.00",
        "total_price": "409.94",
        "total_tax": "11.94",
        "total_weight": 400,
        "updated_at": "2012-08-24T14:02:15-04:00",
        "user_id": 1
      }
 
