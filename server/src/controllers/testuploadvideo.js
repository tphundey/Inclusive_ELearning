require("dotenv/config");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dut2gymbb",
    api_key: "447885367917838",
    api_secret: "Lm5YbRUtPCuXYjt9jDeEBEBVHQ0",
});

// async function run() {
//     const file = '../configs/test.mp4';
//     try {
//     const result = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_large(
//         file,
//         {
//           resource_type: 'video',
//         },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           }
//           resolve(result);
//         }
//       );
//     });
//     console.log(`> Result: ${result.secure_url}`);
//   } catch (error) {
//     console.error(error);
//   }
// }

// run();
