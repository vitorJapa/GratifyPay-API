class Item {
    constructor(id ,type, name, description, itemProductionCost) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.itemProductionCost = itemProductionCost;
    }
};

module.exports = Item;