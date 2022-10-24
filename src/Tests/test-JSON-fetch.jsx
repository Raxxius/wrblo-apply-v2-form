const TEST_JSON = {
    formList: [
        {    
            id: '0',
            listType: 'text',
            formTitle: 'name',
            formText: 'Keith',
            maxCharacter: 50,
        },
        {
            id: '1',
            listType: 'email',
            formTitle: 'email address',
            formText: 'Raxxman@gmail.com',
            maxCharacter: 50,
        },
        {
            id: '2',
            listType: 'fieldset',
            legend: 'legend',
            list: [{
                id: '3',
                listType: 'text',
                formTitle: 'secondary list',
                formText: 'secondary list',
                maxCharacter: 50,
            },
            {
                id: '4',
                listType: 'text',
                formTitle: 'secondary list 2',
                formText: 'secondary list 2',
                maxCharacter: 50,
            }]
        }
    ]
}

export default TEST_JSON