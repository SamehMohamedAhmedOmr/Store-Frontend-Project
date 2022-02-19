import usersSeeder from './users.seeder'

export const DbSeed = async () => {
    console.log('Seeding...')
    await usersSeeder()
    console.log('Seeding completed!')
    process.exit(1)
}

DbSeed();
