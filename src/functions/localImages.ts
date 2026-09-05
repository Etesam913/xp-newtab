const prefix = "local-image:";
export const isLocalImage = (source: string) => source.startsWith(prefix);
export const imageUrlInput = (source: string) =>
  isLocalImage(source) ? "" : source;

async function openImages(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    let blocked = false;
    const request = indexedDB.open("xp-newtab-images", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("images");
    request.onerror = () => reject(request.error);
    request.onblocked = () => {
      blocked = true;
      reject(
        new Error("Image storage is blocked. Close other tabs and try again."),
      );
    };
    request.onsuccess = () => {
      if (blocked) {
        request.result.close();
        return;
      }
      request.result.onversionchange = () => request.result.close();
      resolve(request.result);
    };
  });
}

export async function saveLocalImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  const preview = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = preview;
    await image.decode();
  } catch {
    throw new Error(
      "This file could not be opened as an image. Choose another image.",
    );
  } finally {
    URL.revokeObjectURL(preview);
  }
  // Identical files share a record, even when used in multiple places.
  const hash = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  const source =
    prefix +
    Array.from(new Uint8Array(hash), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
  const db = await openImages();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("images", "readwrite");
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(tx.error);
      tx.onerror = () => reject(tx.error);
      tx.objectStore("images").put(file, source);
    });
  } finally {
    db.close();
  }
  return source;
}

export async function readLocalImage(source: string): Promise<Blob> {
  const db = await openImages();
  try {
    return await new Promise<Blob>((resolve, reject) => {
      const tx = db.transaction("images", "readonly");
      const request = tx.objectStore("images").get(source);
      tx.onabort = () => reject(tx.error);
      request.onerror = () => reject(request.error);
      request.onsuccess = () =>
        request.result instanceof Blob
          ? resolve(request.result)
          : reject(new Error("The saved image is missing. Choose it again."));
    });
  } finally {
    db.close();
  }
}
