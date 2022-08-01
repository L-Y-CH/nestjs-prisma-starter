import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function user() {
  await prisma.user.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER'
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'bart123@simpson.com',
      firstname: 'Bart123',
      lastname: 'Simpson123',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });

  console.log({ user1, user2, user3 });
}

async function item() {
  await prisma.item.deleteMany();

  const item1 = await prisma.item.create({
    data:{
      id: 'G00000001',
      info: {}
    }
  });

  console.log(item1);

}

Promise.all([user(), item()])
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
