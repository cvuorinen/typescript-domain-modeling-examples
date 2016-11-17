class Uuid {
    constructor(private value: string) {
        if (!/^[-a-fA-F\d]{36}$/.test(value)) {
            throw `Invalid UUID: "${value}"`;
        }
    }

    public toString(): string {
        return this.value;
    }

    public static create(): Uuid {
        return new Uuid(
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            })
        );
    }
}

try {
    const invalid = new Uuid('foo');
} catch (e) {
    console.error(e);
}

const id = new Uuid('bbd0ed2d-98e9-11e6-a49f-1633bb132a9c');
const newId = Uuid.create();

console.log(`Your id is "${id}"`);
console.log(`New id is "${newId}"`);
