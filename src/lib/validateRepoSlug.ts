export default (repoSlug: string) => {
  const result = repoSlug.split('/');

  return result.length === 2 ? true : 'Invalid repo slug provided';
};
