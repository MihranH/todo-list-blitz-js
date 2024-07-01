import db from 'db';

type Data = {
  id: number;
  name: string;
  completed: boolean;
};

export default async function updateTask({ id, name, completed }: Data) {
  await db.task.update({
    data: {
      name,
      completed,
    },
    where: { id },
  });
}
