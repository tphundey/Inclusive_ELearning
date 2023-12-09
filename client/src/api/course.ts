// export const fetchCategoryData = async (productsData: any, setCategoryData: any, setIsCategoryLoading: any) => {
//   if (productsData) {
//     setIsCategoryLoading(true);

//     const categoryPromises = productsData.map(async (product: any) => {
//       try {
//         const response = await fetch(`http://localhost:3000/Categories/${product.categoryID}`);
//         if (response.ok) {
//           const category = await response.json();
//           return category;
//         } else {
//           console.error('Lỗi khi truy xuất dữ liệu danh mục:', response.status, response.statusText);
//         }
//       } catch (error) {
//         console.error('Lỗi khi truy xuất dữ liệu danh mục:', error);
//       }
//       return null;
//     });

//     const categories = await Promise.all(categoryPromises);
//     setCategoryData(categories.filter(category => category !== null));
//     setIsCategoryLoading(false);
//   }
// };


