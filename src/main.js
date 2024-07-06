import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function main() {
//   const contoh = await prisma.contoh.create({
//     data: {
//       name: "Irkham Taefuri",
//       email: "irkhamtai@gmail.com",
//     },
//   });
//   console.log(contoh);
// }

async function main() {
  // const allUser = await prisma.user.findMany();
  // console.log(allUser);
  // hallo

  await prisma.user.create({
    data: {
      username: "kanzunby",
      password: "kanzun12",
      name: "Kanzun Bairuha",
      token: "jfdaldjfajsl",
      contacts: {
        create: {
          first_name: "Willy",
          last_name: "Sandy",
          email: "willysandy@gmail.com",
          phone: "081324657483",
          address: {
            create: {
              street: "Jl. Durian ganyong",
              city: "Purbalingga",
              province: "Jawa Tengah",
              country: "Indonesia",
              postal_code: "53647",
            },
          },
        },
      },
    },
  });

  const allUser = await prisma.user.findMany({
    include: {
      contacts: true,
    },
  });

  console.dir(allUser, { depth: null });

  // await prisma.contact.update({
  //   where: {
  //     id: "6668a0ff4cf7300d4b55005c",
  //   },
  //   data: {
  //     address: {
  //       street: "Jl Merdeka",
  //       city: "Purbalingga",
  //       province: "Jawa Tengah",
  //       country: "Indonesia",
  //       zip: "54364",
  //     },
  //   },
  // });

  // const contact = await prisma.contact.findMany({
  //   include: {
  //     address: true,
  //   },
  // });

  // console.dir(contact);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
