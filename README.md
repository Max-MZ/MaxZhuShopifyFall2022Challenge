
  

# # ShopifyBackendChallengeF22

This is my submission to the Shopify Challenge for Fall 2022.

Express.js and Postgres, I created a backend that acts as an inventory tracker. A query for items provides the item name, its warehouse location, and the current weather at that warehouse (provided by https://www.weatherapi.com/)

It provides CRUD functionality, as

 - Items can be CREATED
 - Items can be LISTED/READ
 - Item location can be UPDATED
 - Items can be DELETED

This backend also provides the ability to "undelete" items. If restored, they show back up when fetched with their previous warehouse location. 

# How to Use
App is hosted at https://replit.com/@maxzhusss/MaxZhuShopifyFall2022Challenge

Hit green "Run" button at top of page to launch the server! It will be made available at  https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co 

From here, the backend can be communicated with through cURL requests from your console, or favourite API platform such as Postman to start using it. 

See [Examples](#Examples) for step by step examples.

See [REST API Usage](#REST-API-Usage) for body structure of requests. 

# REST API Usage
 - Create / Update item `POST https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/item` 
  - Get Items `GET https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/item` 
 - Deletion `DELETE https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/item` 
 - Undelete`GET https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/delete?item={itemname}` 

## Creating / Updating Item Body
    {
    "name": <ITEM_NAME>,
    "warehouse": <WAREHOUSE_LOCATION>,
    }


## Deletion Body

    {
    "name": <ITEM_NAME>,
    "reason": <DELETION_COMMENTS>
    }

# Examples
**Getting a list of Items**

    curl --location --request GET 'https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/item'

**Returns** 

    {
    "data": [
        {
            "itemname": "bike",
            "warehouselocation": "Waterloo",
            "weather": "5.8 degrees Celcius, Partly cloudy"
        },
        {
            "itemname": "desk",
            "warehouselocation": "Toronto",
            "weather": "12 degrees Celcius, Sunny"
        }
    ]
}

**Updating Item**

        curl --location --request POST 'https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/item' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "bike",
      "warehouse": "Chicago"
    }'

Following a update, we see the warehouse that the bike is located in has changed to Chicago: 

    {
        "data": [
            {
                "itemname": "bike",
                "warehouselocation": "Chicago",
                "weather": "14.4 degrees Celcius, Partly cloudy"
            },
            {
                "itemname": "desk",
                "warehouselocation": "Toronto",
                "weather": "12 degrees Celcius, Sunny"
            }
        ]
    }

**Deletion and Undeletion**

Delete the bike, and provide a reason that is stored in the postgres DB. 

    curl --location --request DELETE 'localhost:3000/item' \
    --header 'I;' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "chair",
      "reason": "Out of Stock"
    }'
It will not show up on another list command.

In order to have it show up again, it can be undeleted. A GET request to the correct endpoint with the parameter of item will find the item and undelete it if found. 

     curl --location --request GET 'https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/delete/bike' \
    --header 'I;' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "chair",
      "warehouse": "Chicago"
    }'
