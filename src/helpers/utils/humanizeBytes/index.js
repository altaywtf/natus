export default (bytes) => {
  if (!bytes) return 0;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) {
    return 'n/a';
  }

  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);

  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }

  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
};
