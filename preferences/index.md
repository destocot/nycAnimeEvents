Libraries

- tanstack/query (asynchronous state management)
- zustand (global state management)
- tailwind (css styling)
- shadcn (components)
- valibot (validation library)
  - see ./llms/valibot.txt for full instructions
- formisch (form library)
  - see ./llms/formisch.txt for full instructions
- prisma (orm)
- neondb (postgres instance)

Resource Structure

- a resource represents a prisma model (i.e. Posts)
- a folder called resources should always work this way
- /src/resources/posts/queries.ts (these are prisma queries)
  - you can import types for each resource with `import type { Post } from "@/generated/prisma/client";`
  - you can import `import type { Prisma } from "@/generated/prisma/client";` and do things such as `args: Prisma.PostCountArgs`
- my naming convention for most queries is findAllPosts, findOnePost, updatePost, createPost, removePost
  - sometimes i will need to be more specific if necessesary for example, findOnePostById
  - we love tanstack query so these will probably be passed to useQueries
- /src/resources/posts/actions/readable-name-action.ts (these are server actions for mutations, such as insert, update, and delete)
  - these typically call queries, each file should have 1 action in and be named for example createPostActionm
  - "use server" should be at the top of each file
  - very unlikely, but these will be called in `route.ts` files but i usually do not have these unless its an external resource or potentially works better for an infinite query or something
  - we love tanstack query so these are probaly going to be passed to useMutations
- /src/resources/posts/validators.ts (these hold the valibot validation schemas)
  - naming is as so ResourceSchema or VerbResourceSchema, with types with same casing but with Input or Output instead of Schema for example ResourceInput ResourceOutput

Effective Tanstack Query Keys:

```
const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) =>
    [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
}
```
