export default function Feature({title, description, children}: {title: string; description: string, children: any}) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl p-8 transition duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 dark:hover:bg-gray-700/60 dark:hover:shadow-none">
      <div className="flex h-10 w-10 rounded border border-gray-200 dark:border-gray-700">
        {children}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
