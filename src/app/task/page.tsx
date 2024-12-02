import prisma from "@/prisma/db";
import { Task } from "@prisma/client";
import { addTask } from "./actions";

export default async function Page() {
  const tasks: Task[] = await prisma.task.findMany();

  return (
    <>
      <form action={addTask}>
        <input type="text" name="title" className="bg-white text-gray-700" required/>
        <button className="bg-white text-blue-700">Submit</button>
      </form>
      {tasks.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  );
}
