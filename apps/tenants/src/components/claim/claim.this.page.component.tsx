"use client";
import {useRouter} from "next/navigation";
import {Button} from "@meetfaq/tenants/src/components/utils/button";

export const ClaimThisPageComponent = () => {
  const router = useRouter();
  const goToLogin = () => {
    router.push(process.env.FRONTEND_URL + '/login');
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center py-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white">Hi</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-4">This page can be yours, claim it.</p>
      <div className="mt-3 w-[200px]">
        <Button onClick={goToLogin}>
          Claim it
        </Button>
      </div>
    </div>
  )
}
