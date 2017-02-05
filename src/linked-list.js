const Node = require('./node');

class LinkedList {

    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);
        if (this.isEmpty()){
            this._head = node;
            this._tail = node;  
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;

        return this;
    }

    head() {return this._head.data;}

    tail() {return this._tail.data;}

    at(index) {
        let element = this._head;

        for (let i = 0; i < index; i++) {
            element = element.next;
        }

        return element.data;
    }

    insertAt(index, data) {
        let node = new Node(data),
            next = null,
            prev = null,
            element = this._head;

        if (index == 0) {
            next = element;
            node.data = data;
            node.next = next;
            this._head = node;
            return this;
        } else {
            for (let i = 0; i < index - 1; i++) {
                element = element.next;
            }

            next = element.next;
            prev = element;

            node.next = next;
            node.next.prev = node;
            node.prev = prev;
            node.prev.next = node;

            this.length++;

            return node;
        }
    }

    isEmpty() {
        return (this.length > 0) ? false : true;
    }

    clear() {
        this._tail.data = null;
        this._head.data = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if(!index) {
            this._head.next = this._head;
            this._head.prev=null;
            this.length--;
            return this;    
        }
        let element = this._head;
        for (let i=0; i<index; i++)
            element = element.next;
        element.prev.next=element.next;
        element.next.prev=element.prev;
        this.length--;
        return this;
    }

    reverse() {
        let temporary = null,
            element = this._head;

        while (element !== null) {
            temporary = element.next;
            element.next = element.prev;
            element.prev = temporary;
            element = element.prev;
        }

        temporary = this._head;
        this._head = this._tail;
        this._tail = temporary;

        return this;
    }

    indexOf(data) {
        let element = this._head;
        for (var i=0; i<this.length-1 && element.data!=data ; i++)
            element = element.next;
        return element.data===data ? i : -1;
    }
}

module.exports = LinkedList;
