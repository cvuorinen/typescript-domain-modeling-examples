
type Guid = string;
type DateTimeString = string;
type Lang = "en" | "fi" | "se";
enum ItemStatus { Disabled = 0, Enabled = 1 };

interface Item {
    id: Guid;
    type: "actual" | "virtual";
    status: ItemStatus;
    created: DateTimeString;
    published: DateTimeString;
    translations: Array<Lang>;
}

const items: Item[] = [
    {
        id: 'WJ3kj-EWFJ43-4kqKJ-345A3',
        type: 'actual',
        status: 1,
        created: '2016-11-03 12:34:56',
        published: '2016-11-03 15:04:15',
        translations: ['fi']
    },
    {
        id: 'foo',
        type: 'virtual',
        status: 0,
        created: '2016-11-02 12:34:56',
        published: '2016-11-03 16:14:15',
        translations: ['fi', 'se']
    }
];

function enabledItems(items: Item[]) {
    return items.filter(item => item.status === ItemStatus.Enabled);
}


console.log('enabled.items', enabledItems(items));
