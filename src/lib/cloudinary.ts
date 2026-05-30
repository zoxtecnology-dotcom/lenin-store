const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD as string;

export function imgUrl(publicId: string, opts = "w_800,q_auto,f_auto") {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${opts}/${publicId}`;
}

export function thumbUrl(publicId: string) {
  return imgUrl(publicId, "w_400,h_500,c_fill,q_auto,f_auto");
}
