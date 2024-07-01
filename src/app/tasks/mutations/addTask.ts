import db from 'db';

type Data = {
  name: string;
  completed: boolean;
};

export default async function addTask({ name, completed }: Data) {
  await db.task.create({
    data: {
      name,
      completed,
    },
  });
}
