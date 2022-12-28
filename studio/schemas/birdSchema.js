export const birdSchema = {
    name: 'birds',
    title: 'Birds',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'walletAddress',
            title: 'Wallet Address',
            type: 'string',
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'string',
        },
        {
            name: 'isProfileImageNFT',
            title: 'Is Profile Image NFT',
            type: 'boolean',
        },
        {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'string',
        },
        {
            name: 'hums',
            title: 'Hums',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'hums'}],
                },
            ],
        },
    ]
};