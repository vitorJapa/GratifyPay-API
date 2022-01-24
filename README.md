# GratifyPay-API

## api created using NodeJS Typescript, ExpressJS framework, firebase database

## there are 5 endpoints in this api
## all the api's starts with http://localhost:5000/api/
#route GET /items -- endpoint to return all the items in the database
# return a 200 response code with a list of items:
#
#[
    {
        "id": "KWFH1uFgVkHbbq4KZwZX",
        "type": "Mechanical",
        "name": "item 3",
        "description": "my test description",
        "itemProductionCost": 105.52
    },
    {
        "id": "OgdX4DkPSynQv8WTmuGp",
        "type": "Mechanical",
        "name": "item 2",
        "description": "my test description",
        "itemProductionCost": 105.52
    }
]

# if there is no item to return, the response will be 404

## GET /item/$ID -- get one specific item 
# ex: 
# id = OgdX4DkPSynQv8WTmuGp
# response code 200
# response body:
# {
    "name": "item 2",
    "itemProductionCost": 105.52,
    "description": "my test description",
    "type": "Mechanical",
    "calculatedProductionCost": 155.51999999999998
}
# if the item don't exist, it will return 404 an an JSON error "Error": "Item with the given ID not found"

#POST /item
# expected body: 
#{
    "type": "Mechanical",
    "name": "item 2",
    "description": "my test description",
    "itemProductionCost": 105.52
}
# response 200 with the response body the firebase database primare key:
#{
    "id": "T12MfDoJ5CEhb7OC0oTN"
}

# if the name already exists in the data base, the api will return an erro with the status code 400
#body error :
#{
    "Error": "Name already exists!"
}

#PUT /item/$id
# expected body:
#
{
    "type": "Mechanical",
    "name": "item 3",
    "description": "my test test test",
    "itemProductionCost": 105.52
}
#if the id exists the api will return an 200 with the response body:
# {
    "Msg": "Item record updated successfuly"
}

#if the id don't exists the api will return an 400
#with the error "NOT_FOUND: No document to update"

#Delete /item/$id
#if the id exists, the api will return 200 with the response body:
#{'Msg': 'Record deleted successfuly'}
#if the id don't exist, the api will return a 404 with the response body:
#{
    "Error": "Item with the given ID not found"
}
