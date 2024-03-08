export default {
  data: {
    typeCodes: [
      {
        id: 'aa',
        name: 'someName',
        elements: [
          {
            id: 'aaa',
            name: 's2',
            level: 1,
            code: 'code',
            parentPath: '/',
            __typename: 'GraphQLTypeCodeElements',
          },
          {
            id: 'bbb',
            name: 's3',
            level: 2,
            code: 'code2',
            parentPath: '/code',
            __typename: 'GraphQLTypeCodeElements',
          },
        ],
      },
    ],
  },
}
