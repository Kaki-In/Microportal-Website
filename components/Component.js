export class Component {
    constructor (element, parent) {
        this.__element__ = element;
        this.__parent__ = null;
    }

    get element() {
        return this.__element__;
    }

    set element(element) {
        // Replace the current element by the new one
        this.element.replaceWith(element);
        this.__element__ = element;
    }

    get parent() {
        return this.__parent__;
    }

    set parent(parent) {
        if (parent === undefined) {
            throw new TypeError('parent cannot be undefined; would you write "null"?')
        }
        if (this.parent !== null) {
            this.parent.removeChild(this.element);
        }

        this.__parent__ = parent;
    }
}

export function appendChild(parent, child) {
    parent.appendChild(child.element);
    child.parent = parent;
    return child.element;
}

export function removeChild(parent, child) {
    if (child.parent === parent) {
        child.parent = null;
    } else {
        throw new TypeError("the child doesn't belong to this parent");
    }
}

export function insertBefore(parent, child, element) {
    parent.insertBefore(child.element, element);
    child.parent = parent;
    return child.element;
}
