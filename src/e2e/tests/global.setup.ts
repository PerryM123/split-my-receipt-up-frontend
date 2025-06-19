import { execSync } from 'child_process'

export default async function globalSetup() {
  console.log('--------Preparing to seed test database--------')
  try {
    execSync(
      `docker exec ${process.env.MEMORIES_BACKEND_APP_CONTAINER_NAME} php artisan migrate:fresh --seed`,
      {
        stdio: 'inherit'
      }
    )
    console.log('--------Test database loaded successfully--------')
  } catch (error) {
    console.error('--------Seeding failed--------')
    console.error(error)
  }
}
