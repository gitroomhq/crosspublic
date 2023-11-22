export default function Card({ children }: { children: any }) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-200 to-white p-px dark:from-gray-700 dark:via-gray-800 dark:to-darker">
            <div className="relative flex h-full flex-col gap-6 rounded-2xl bg-gray-100 p-8 dark:bg-gray-900">
                { children }
            </div>
        </div>
    )
}