import { HttpError } from 'wasp/server';

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return await context.entities.Task.create({
    data: {
      description: args.description,
      isDone: false,
      userId: context.user.id
    }
  });
}

export const updateTask = async ({ taskId, description, isDone }, context) => {
  if (!context.user) { throw new HttpError(401) }
  
  const task = await context.entities.Task.findUnique({
    where: { id: taskId }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Task.update({
    where: { id: taskId },
    data: { description, isDone }
  });
}
