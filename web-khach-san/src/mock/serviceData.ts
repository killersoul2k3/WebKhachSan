const defaultImage = 'https://via.placeholder.com/80x60?text=No+Image';

const serviceData = [
  {
    id: 1,
    name: "Giặt ủi",
    price: 50000,
    description: "Dịch vụ giặt ủi nhanh chóng.",
    image: "https://link-to-image.com/laundry.jpg",
  },
  {
    id: 2,
    name: "Đưa đón sân bay",
    price: 200000,
    description: "Dịch vụ đưa đón tận nơi.",
    image: "https://link-to-image.com/airport.jpg",
  },
  // ... các dịch vụ khác, mỗi dịch vụ đều có trường image
];

// Nếu dịch vụ nào chưa có ảnh, dùng ảnh mặc định:
serviceData.forEach(service => {
  if (!service.image) {
    service.image = defaultImage;
  }
});

export default serviceData;