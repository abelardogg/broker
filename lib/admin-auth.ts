import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from './auth'

const ADMIN_PATH = '/mgmt-c141f580'

export async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value

  if (!token) {
    redirect(`${ADMIN_PATH}/login`)
  }

  const user = verifySessionToken(token)

  if (!user) {
    redirect(`${ADMIN_PATH}/login`)
  }

  return user
}
