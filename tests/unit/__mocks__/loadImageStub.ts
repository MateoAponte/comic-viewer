export const loadImageStub = (src) => {
  return new Promise((resolve) => {
    // Resolve the promise immediately with the src value
    resolve(src);
  });
};
