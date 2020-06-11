exports.handler = async (event) => {
  const { caption, size } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: `https://res.cloudinary.com/${
      process.env.CLOUDINARY_CLOUD_NAME
    }/image/upload/w_1300/g_west,c_fit,co_rgb:FFFFFFFF,w_1200,x_50,y_25,l_text:dillan.otf_${size}_line_spacing_${
      size * -0.2
    }:${encodeURIComponent(caption)}/${process.env.CLOUDINARY_IMAGE_PUBLIC_ID}`,
  };
};
