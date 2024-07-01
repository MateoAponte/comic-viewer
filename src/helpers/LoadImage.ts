// Function that preloads an image to avoid asynchronous loading of information
export const loadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error('Error loading image'));
    img.src = src;
  });
};
