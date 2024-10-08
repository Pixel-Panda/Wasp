import { HttpError } from 'wasp/server'

export const getUserTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Task.findMany({
    where: {
      userId: context.user.id
    }
  });
}
