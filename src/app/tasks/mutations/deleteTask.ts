import db from 'db';

export default async function deleteTask(id: number) {
  await db.task.delete({
    where: { id },
  });
}
