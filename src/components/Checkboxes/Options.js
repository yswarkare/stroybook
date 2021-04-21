export class Option {
    constructor(object){
        if (typeof(object) === "string") {
            this.name = object || "";
            this.label = object || "";
            this.value = object || "";
            this.checked = false;
            this.defaultChecked = false;
            this.disabled = false;
            this.backgroundColor = "inherit";
        } else if (typeof(object) === "object") {
            this.id = object?.id || "";
            this.name = object?.name || object?.label || object?.value || "";
            this.label = object?.label || object?.name || object?.value || "";
            this.value = object?.value || object?.label || object?.name || "";
            this.checked = object?.checked || false;
            this.defaultChecked = object?.defaultChecked || false;
            this.disabled = object?.disabled || false;
            this.backgroundColor = object?.backgroundColor || "inherit";
        }
    }
}

export class Options extends Array {
    constructor(array){
        super(array)
        this.pop()
        for (let i = 0; i < array?.length; i++) {
            const element = new Option(array[i]);
            this.push(element);
        }
    }

    setDefault (selected) {
        for (let i = 0; i < selected.length; i++) {
            let option = selected[i];
            this.setChecked(option);
        }
    }

    setChecked (option) {
        let checkValue = this.valueExists(option)
        if (checkValue?.exists === true) {
            this[checkValue.index].checked = true;
        } else if (checkValue?.exists === false) {
            this[checkValue.index].checked = false;
        }
    }

    toggleChecked (index) {
        this[index].checked = !this[index].checked;
    }

    valueExists (option) {
        let option_01 = option;
        if (!(option instanceof Option)) {
            option_01 = new Option(option);
        }
        let exists = false;
        let index = undefined;
        for (let i = 0; i < this?.length; i++) {
            console.log(this[i]?.value === option_01?.value)
            if (this[i]?.value === option_01?.value) {
                exists = true;
                index = i;
                break;
            }
        }
        return { exists, index }
    }

    setSelected (option) {
        let option_01 = new Option(option)
        if (this !== undefined && Array.isArray(this)) {
            let exists = false;
            let index = undefined;
            for (let i = 0; i < this?.length; i++) {
                if (this[i]?.value === option_01?.value) {
                    exists = true;
                    index = i;
                    break;
                }
            }
            if (exists === false) {
                option_01.checked = true;
                this.push(option_01)
            } else if (exists === true) {
                option_01.checked = false;
                this.splice(index, 1);
            }
            return this;
        }
    }

    returnSelected () {
        let filtered = []
        for (let i = 0; i < this.length; i++) {
            if (this[i].checked === true) {
                filtered.push(this[i].label);
            }
        }
        return filtered;
    }

    static getSelected (array) {
        let filtered = []
        for (let i = 0; i < array.length; i++) {
            if (array[i].checked === true) {
                filtered.push(array[i].label);
            }
        }
        return filtered;
    }

    static deleteProps (array, optionProps) {
        let filtered = []
        for (let i = 0; i < array.length; i++) {
            if (array[i].checked === true) {
                for (const key in array[i]) {
                    if (!(optionProps.includes(key))) {
                        delete array[i][key];
                    }
                }
                filtered.push(array[i]);
            }
        }
        return filtered;
    }
}

export class Selected extends Options {
    constructor(array){
        super(array)
        this.pop()
        for (let i = 0; i < array?.length; i++) {
            let element = new Option(array[i]);
            element.checked = true;
            element.defaultChecked = true;
            this.push(element);
        }
    }
}