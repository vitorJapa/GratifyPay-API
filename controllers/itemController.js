'use strict';

const { json } = require('body-parser');
const firebase = require('../db');
const Item = require('../models/item');
const Getitem = require('../models/get_item');
const firestore = firebase.firestore();


const addItem = async (req, res, next) => {
    try {
        const req_data = req.body;
        const allItem = await firestore.collection('Item');
        const data = await allItem.get();
        const allItemArray = [];
        data.forEach(doc => {
            const item = new Item(
                doc.id,
                doc.data().type,
                doc.data().name,
                doc.data().description,
                doc.data().itemProductionCost
            );
            allItemArray.push(item);
        });
        const result = allItemArray.find(ab=>ab.name==req_data.name);
        if(result == null) {
            const resp = await firestore.collection('Item').doc().set(req_data)
			const result = await firestore.collection("Item").where("name", "==", req_data.name).get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    res.status(200).send({"id": doc.id});
                });
            })
        }else
            res.status(400).send({"Error": "Name already exists!"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getAllItem = async (req, res, next) => {
    try {
        const allItem = await firestore.collection('Item');
        const data = await allItem.get();
        const allItemArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const item = new Item(
                    doc.id,
                    doc.data().type,
                    doc.data().name,
                    doc.data().description,
                    doc.data().itemProductionCost
                );
                allItemArray.push(item);
            });
            res.send(allItemArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await firestore.collection('Item').doc(id);
        const data = await item.get();
        if(!data.exists) {
            res.status(404).send('Item with the given ID not found');
        }else {
            const allItem = await firestore.collection('Item');
            const allitemdata = await allItem.get();
            const allItemArray = [];
            allitemdata.forEach(doc => {
                const item = new Getitem(
                    doc.id,
                    doc.data().type,
                    doc.data().name,
                    doc.data().description,
                    doc.data().itemProductionCost
                );
                allItemArray.push(item);
            });
            const calculatedProductionCost = 50 + data.data().itemProductionCost;
            const data_teste = {'calculatedProductionCost': calculatedProductionCost};
            const merge = {...data.data(), ...data_teste}
            res.send(merge);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const item =  await firestore.collection('Item').doc(id);
        await item.update(data);
        res.send('Item record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await firestore.collection('Item').doc(id);
        const data = await item.get();
        if(!data.exists) {
            res.status(404).send('Item with the given ID not found');
        }
        await firestore.collection('Item').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addItem,
    getAllItem,
    getItem,
    updateItem,
    deleteItem
}