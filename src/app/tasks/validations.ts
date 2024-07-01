import { z } from 'zod';

export const TODO = z.object({
  name: z.string(),
  completed: z.boolean(),
});
