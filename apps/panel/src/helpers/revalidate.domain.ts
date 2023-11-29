export const revalidateDomain = async () => {
  await fetch('/api/revalidate');
}
