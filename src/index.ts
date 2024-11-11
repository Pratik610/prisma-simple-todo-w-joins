import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//  Create New User
const createUser = async (email: string, name: string, password: string) => {
  const result = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  console.log(result);
};

//  Get All Users
const getAllUser = async () => {
  const result = await prisma.user.findMany();
  console.log(result);
};

//  Get User By Id
const getUserById = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true, // requesting only name and email
      email: true,
    },
  });
  console.log(result);
};

//  Update User Name
const updateUserNameById = async (id: string) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: "Frostty",
    },
  });
  console.log(result);
};

//  Delete User ID
const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  console.log(result);
};

const createToDO = async () => {
  const result = await prisma.toDo.create({
    data: {
      title: "MY 2st Todo",
      description: "My ToDO Desc",
      userId: "eed85b63-3873-41c0-8fbc-54751df372db",
    },
  });
  console.log(result);
};

// ...............................

// JOINS


//  get All Todos with user details
const getTodoUser = async (id: string) => {
  const result = await prisma.toDo.findMany({
    where: {
      userId: id,
    },
    select: {
      title: true,
      description: true,
      user: {
        select: {
          name: true,
          password: false,
        },
      },
    },
  });

  console.log(result);
};


//  get User Details with all Todos
const getUserTodo = async (id: string) => {
  const result = await prisma.user.findMany({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      todos: true,
    },
  });

  console.log(result[0].todos);
};


