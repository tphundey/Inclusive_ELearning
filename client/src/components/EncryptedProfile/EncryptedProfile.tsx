function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

export const getUserEmail = () => {
    const encryptedProfile = localStorage.getItem('profile');
    if (encryptedProfile) {
      const decryptedProfile = decodeData(encryptedProfile);
      const profile = JSON.parse(decryptedProfile);
      const userEmail = profile.email;
      return userEmail;
    } else {
      return null; // hoặc bạn có thể trả về một giá trị mặc định khác nếu không tìm thấy thông tin người dùng
    }
  };