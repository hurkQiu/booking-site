export default class ShoppingItem {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.quantity = 0;
        this.state = false;
    }
    setQuantity(quantity){
        this.quantity = quantity;
    }
    setState(state){
        this.state = state;
    }
}