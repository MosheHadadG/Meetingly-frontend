export const totalUnreadMessage = (key, object) => {
  const hasKey = key in object;
  if (hasKey) {
    return object[key];
  } else {
    return false;
  }
};
