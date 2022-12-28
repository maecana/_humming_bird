export const humSchema = {
    name: 'hums',
    title: 'Hums',
    type: 'document',
    fields: [
        {
            name: 'hum',
            title: 'Hum',
            type: 'string',
        },
        {
            name: 'timestamp',
            title: 'Timestamp',
            type: 'datetime',
        },
        {
            name: 'bird',
            title: 'Bird',
            type: 'reference',
            to: [{type: 'birds'}],
        },
    ]
}