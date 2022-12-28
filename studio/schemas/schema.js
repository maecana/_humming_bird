import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import { birdSchema } from './birdSchema';
import { humSchema } from './humSchema';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    birdSchema, humSchema
  ]),
})
