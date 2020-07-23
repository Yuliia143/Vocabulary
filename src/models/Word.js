export default class Word {
    constructor(data) {
        if (typeof data === 'undefined') {
            data ={}
        }
        this._id = null;
        this._title = data.title || '';
        this._status = data.status || 'studying';
        this.img = data.img || '';
        this.translation = data.translation || '';
    }

    get id() {
        return this._id;
    }
    set id(value){
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value){
        this._title = value;
    }

    get status() {
        return this._status;
    }

    set status(value){
        this._status = value;
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }

    get translation() {
        return this._translation;
    }

    set translation(value) {
        this._translation = value;
    }

    getDto() {
        this.id = 16;
        return {
            id: this.id,
            title: this.title,
            status: this.status,
            translation: this.translation,
            img: this.img
        }
    }
}