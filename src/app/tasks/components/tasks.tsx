'use client';

import { Form } from 'src/app/components/Form';
import { LabeledTextField } from 'src/app/components/LabeledTextField';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';
import { invalidateQuery, useQuery, useMutation } from '@blitzjs/rpc';
import { useState } from 'react';
import { TODO } from '../validations';
import getTasks from '../queries/getTasks';
import addTask from '../mutations/addTask';
import deleteTask from '../mutations/deleteTask';
import updateTask from '../mutations/updateTask';

const FORM_ERROR = 'FORM_ERROR';

export default function Tasks() {
  const [editId, setEditId] = useState<number>();
  const [taskNameToAdd, setTaskNameToAdd] = useState('');
  const [taskNameToEdit, setTaskNameToEdit] = useState('');
  const [taskAlreadyExists, setTaskAlreadyExists] = useState(false);
  const [addTaskMutation] = useMutation(addTask, {
    onSuccess: async () => {
      await invalidateQuery(getTasks);
    },
  });
  const [deleteTaskMutation] = useMutation(deleteTask, {
    onSuccess: async () => {
      await invalidateQuery(getTasks);
    },
  });
  const [updateTaskMutation] = useMutation(updateTask, {
    onSuccess: async () => {
      await invalidateQuery(getTasks);
    },
  });
  const [tasks] = useQuery(getTasks, undefined);

  const handleEdit = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTaskNameToEdit(task.name);
      setEditId(id);
    }
  };

  const saveEdit = async () => {
    const exists = tasks.find(
      (task) => task.name === taskNameToEdit && task.id !== editId,
    );
    if (exists) {
      setTaskAlreadyExists(true);
      return;
    }
    setTaskAlreadyExists(false);
    const task = tasks.find((task) => task.id === editId);
    if (task) {
      const data = {
        ...task,
        name: taskNameToEdit,
      };
      await updateTaskMutation(data);
      setTaskNameToEdit('');
      setEditId(undefined);
    }
  };

  const toggleCompleted = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTaskNameToEdit('');
      setEditId(undefined);
      const data = {
        ...task,
        completed: !task.completed,
      };
      await updateTaskMutation(data);
    }
  };

  return (
    <div>
      <Form
        submitText='Add'
        schema={TODO}
        initialValues={{ name: '', completed: false }}
        onSubmit={async () => {
          try {
            if (!taskNameToAdd) {
              return { [FORM_ERROR]: 'Please enter the task name' };
            }
            if (tasks.find((task) => task.name === taskNameToAdd)) {
              return { [FORM_ERROR]: 'Please enter unique task name' };
            }
            await addTaskMutation({ name: taskNameToAdd, completed: false });
            return setTaskNameToAdd('');
          } catch (error: any) {
            return { [FORM_ERROR]: 'Sorry, something went wrong' };
          }
        }}
      >
        <LabeledTextField
          onChange={(e) => setTaskNameToAdd(e.target.value)}
          value={taskNameToAdd}
          name='name'
          label='TODO'
          placeholder='Write a task to do'
        />
      </Form>
      <ul className='mt-10 space-y-4 text-gray-500 max-h-72 overflow-scroll border px-3 py-3 rounded'>
        {tasks.map((task) => (
          <li key={task.id} className='flex space-x-6 flex justify-between'>
            {editId !== task.id ? (
              <div>
                <span className='text-md font-medium'>{task.name}</span>
              </div>
            ) : (
              <input
                value={taskNameToEdit}
                onChange={(e) => setTaskNameToEdit(e.target.value)}
                type='text'
                className='appearance-none border rounded w-full py-1 px-2 text-gray-500 leading-tight focus:outline-none focus:shadow-outline'
              />
            )}
            {!task.completed && (
              <div className='flex space-x-1'>
                <button
                  className='bg-green-500 text-white p-2 rounded hover:bg-green-700'
                  onClick={() => toggleCompleted(task.id)}
                  type='button'
                >
                  <CheckCircleIcon className='h-4 w-4' />
                </button>
                <button
                  className='bg-blue-500 text-white p-2 rounded hover:bg-blue-700'
                  onClick={
                    editId ? () => saveEdit() : () => handleEdit(task.id)
                  }
                  type='button'
                >
                  {editId === task.id ? (
                    <CheckIcon className='h-4 w-4' />
                  ) : (
                    <PencilIcon className='h-4 w-4' />
                  )}
                </button>
                <button
                  className='bg-red-500 text-white p-2 rounded hover:bg-red-700'
                  onClick={async () => {
                    await deleteTaskMutation(task.id);
                    setTaskAlreadyExists(false);
                  }}
                  type='button'
                >
                  <TrashIcon className='h-4 w-4' />
                </button>
              </div>
            )}
            {task.completed && (
              <button
                type='button'
                className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500 shadow-lg shadow-green-500/50 dark:shadow-lg rounded-lg text-sm px-2 py-1 text-center me-1 mb-1 ml-2'
              >
                Done
              </button>
            )}
          </li>
        ))}
      </ul>
      {taskAlreadyExists && (
        <div
          className='p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 mt-4'
          role='alert'
        >
          <span className='font-medium'>Task already exists.</span>
        </div>
      )}
    </div>
  );
}
