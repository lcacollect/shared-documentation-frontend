import { SchemaTemplate } from '../components/schemaTemplatesTable'

export default {
  schemaTemplates: [
    {
      id: '3481d0bb-a0b5-49fa-bdea-27a4253cff0a',
      name: 'template',
      schema: {
        id: '1234',
        name: 'reportinSchema',
        projectId: 'aaa',
        categories: [],
      },
      original: {
        id: '1234',
        name: 'reportinSchema',
        projectId: 'aaa',
        categories: [],
      },
    } as SchemaTemplate,
    {
      id: '3481d0bb-a0b5-49fa-bdea-27a4253cff0a2',
      name: 'template2',
      schema: {
        id: '2222',
        name: 'reportinSchema2',
        projectId: 'bbb',
        categories: [],
      },
      original: undefined,
    } as SchemaTemplate,
  ],
}
