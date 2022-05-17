

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

Hit green "Run" button at top of page to launch the server!

From here, the backend can be communicated with through cURL requests from your console, or favourite API platform such as Postman to start using it. 

See [REST API Usage](#REST-API-Usage) for body structure of requests. 

# REST API Usage
 - Create / Update item `POST https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/item` 
  - Get Items `GET https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/item` 
 - Deletion `DELETE https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/item` 
 - Undelete`GET https://MaxZhuShopifyFall2022Challenge.maxzhusss.repl.co/delete?item={itemname}` 
## Uploading Body
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


