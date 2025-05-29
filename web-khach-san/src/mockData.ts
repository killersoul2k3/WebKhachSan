import { mockRooms } from "./pages/RoomTypesPage";

// Helper function to get dates
const getFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const getPastDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

// Mock Customer Data
export const mockCustomers = [
  { id: 1, name: "Nguyễn Văn A", phone: "0901111111", email: "nguyenvana@example.com", totalStays: 3, notes: "Khách quen" },
  { id: 2, name: "Trần Thị B", phone: "0902222222", email: "tranthib@example.com", totalStays: 1, notes: "" },
  { id: 3, name: "Lê Văn C", phone: "0903333333", email: "levanc@example.com", totalStays: 5, notes: "VIP" },
  { id: 4, name: "Phạm Thị D", phone: "0904444444", email: "phamthid@example.com", totalStays: 2, notes: "" },
  { id: 5, name: "Huỳnh Văn E", phone: "0905555555", email: "huynhvane@example.com", totalStays: 1, notes: "" },
  { id: 6, name: "Võ Thị F", phone: "0906666666", email: "vothif@example.com", totalStays: 4, notes: "Cần phòng yên tĩnh" },
  { id: 7, name: "Đặng Văn G", phone: "0907777777", email: "dangvang@example.com", totalStays: 1, notes: "" },
  { id: 8, name: "Bùi Thị H", phone: "0908888888", email: "buithih@example.com", totalStays: 2, notes: "" },
  { id: 9, name: "Hồ Văn I", phone: "0909999999", email: "hovani@example.com", totalStays: 1, notes: "" },
  { id: 10, name: "Ngô Thị K", phone: "0910101010", email: "ngothik@example.com", totalStays: 3, notes: "" },
  { id: 11, name: "Dương Văn L", phone: "0911111111", email: "duongvanl@example.com", totalStays: 1, notes: "" },
  { id: 12, name: "Đinh Thị M", phone: "0912121212", email: "dinhthim@example.com", totalStays: 2, notes: "" },
  { id: 13, name: "Hoàng Văn N", phone: "0913131313", email: "hoangvann@example.com", totalStays: 1, notes: "" },
  { id: 14, name: "Trần Văn O", phone: "0914141414", email: "tranvano@example.com", totalStays: 3, notes: "" },
  { id: 15, name: "Lê Thị P", phone: "0915151515", email: "lethip@example.com", totalStays: 1, notes: "" },
  { id: 16, name: "Phạm Văn Q", phone: "0916161616", email: "phamvanq@example.com", totalStays: 2, notes: "Yêu cầu tầng cao" },
  { id: 17, name: "Huỳnh Thị R", phone: "0917171717", email: "huynhthir@example.com", totalStays: 1, notes: "" },
  { id: 18, name: "Võ Văn S", phone: "0918181818", email: "vovans@example.com", totalStays: 4, notes: "" },
  { id: 19, name: "Đặng Thị T", phone: "0919191919", email: "dangthit@example.com", totalStays: 1, notes: "" },
  { id: 20, name: "Bùi Văn U", phone: "0920202020", email: "buivanu@example.com", totalStays: 2, notes: "" },
];

// Mock Booking Data
export const mockBookings = [
  // 5 bookings for today
  { id: 1, customerId: 1, roomId: 1, checkInDate: getFutureDate(0), checkOutDate: getFutureDate(3), status: "Đã xác nhận", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 1)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 1)?.name },
  { id: 2, customerId: 2, roomId: 5, checkInDate: getFutureDate(0), checkOutDate: getFutureDate(2), status: "Đã xác nhận", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 5)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 2)?.name },
  { id: 3, customerId: 3, roomId: 10, checkInDate: getFutureDate(0), checkOutDate: getFutureDate(4), status: "Đang xử lý", requestedFeatures: "Late check-out", roomType: mockRooms.find(r => r.id === 10)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 3)?.name },
  { id: 4, customerId: 4, roomId: 15, checkInDate: getFutureDate(0), checkOutDate: getFutureDate(1), status: "Đã xác nhận", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 15)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 4)?.name },
  { id: 5, customerId: 5, roomId: 20, checkInDate: getFutureDate(0), checkOutDate: getFutureDate(3), status: "Đã xác nhận", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 20)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 5)?.name },

  // 15 bookings for 1-2 weeks ago
  { id: 6, customerId: 6, roomId: 2, checkInDate: getPastDate(14), checkOutDate: getPastDate(10), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 2)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 6)?.name },
  { id: 7, customerId: 7, roomId: 7, checkInDate: getPastDate(13), checkOutDate: getPastDate(9), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 7)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 7)?.name },
  { id: 8, customerId: 8, roomId: 12, checkInDate: getPastDate(12), checkOutDate: getPastDate(8), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 12)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 8)?.name },
  { id: 9, customerId: 9, roomId: 17, checkInDate: getPastDate(11), checkOutDate: getPastDate(7), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 17)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 9)?.name },
  { id: 10, customerId: 10, roomId: 22, checkInDate: getPastDate(10), checkOutDate: getPastDate(6), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 22)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 10)?.name },
  { id: 11, customerId: 11, roomId: 25, checkInDate: getPastDate(9), checkOutDate: getPastDate(5), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 25)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 11)?.name },
  { id: 12, customerId: 12, roomId: 30, checkInDate: getPastDate(8), checkOutDate: getPastDate(4), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 30)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 12)?.name },
  { id: 13, customerId: 13, roomId: 35, checkInDate: getPastDate(7), checkOutDate: getPastDate(3), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 35)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 13)?.name },
  { id: 14, customerId: 14, roomId: 40, checkInDate: getPastDate(6), checkOutDate: getPastDate(2), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 40)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 14)?.name },
  { id: 15, customerId: 15, roomId: 45, checkInDate: getPastDate(5), checkOutDate: getPastDate(1), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 45)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 15)?.name },
  { id: 16, customerId: 16, roomId: 50, checkInDate: getPastDate(14), checkOutDate: getPastDate(12), status: "Đã hoàn thành", requestedFeatures: "Yêu cầu tầng cao", roomType: mockRooms.find(r => r.id === 50)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 16)?.name },
  { id: 17, customerId: 17, roomId: 55, checkInDate: getPastDate(13), checkOutDate: getPastDate(11), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 55)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 17)?.name },
  { id: 18, customerId: 18, roomId: 60, checkInDate: getPastDate(12), checkOutDate: getPastDate(10), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 60)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 18)?.name },
  { id: 19, customerId: 19, roomId: 4, checkInDate: getPastDate(11), checkOutDate: getPastDate(9), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 4)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 19)?.name },
  { id: 20, customerId: 20, roomId: 9, checkInDate: getPastDate(10), checkOutDate: getPastDate(8), status: "Đã hoàn thành", requestedFeatures: "", roomType: mockRooms.find(r => r.id === 9)?.type, numberOfRooms: 1, customerName: mockCustomers.find(c => c.id === 20)?.name },
];

// Combine customer and booking data
export const customersWithBookings = mockCustomers.map(customer => {
  const customerBookings = mockBookings
    .filter(booking => booking.customerId === customer.id)
    .map(booking => {
      const room = mockRooms.find(r => r.id === booking.roomId);
      return {
        bookingId: booking.id,
        roomName: room?.name || "Không rõ",
        roomType: room?.type || "Không rõ",
        roomPrice: room?.price || 0,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        status: booking.status,
        requestedFeatures: booking.requestedFeatures,
        promotion: "", // Placeholder for promotion
      };
    });

  return {
    ...customer,
    bookings: customerBookings,
  };
});

interface Invoice {
  id: number;
  bookingId: number;
  customerId: number;
  amount: number;
  paymentMethod: string;
  status: string;
  invoiceDate: string;
  notes: string;
}

export const mockInvoices: Invoice[] = [];

for (let i = 1; i <= 50; i++) {
  let status = "Đã thanh toán";
  let paymentMethod = "Chuyển khoản";
  let notes = "";

  if (i > 30 && i <= 38) {
    status = "Chờ thanh toán tiền mặt";
    paymentMethod = "Tiền mặt";
  } else if (i > 38 && i <= 43) {
    status = "Chưa thanh toán";
    paymentMethod = "Chưa rõ";
  } else if (i > 43) {
    status = "Đã thanh toán";
    paymentMethod = "Đã gia hạn";
    notes = "Gia hạn phòng";
  }

  // Link to existing mock bookings and customers (simple modulo for demonstration)
  const bookingId = (i % mockBookings.length) + 1;
  const booking = mockBookings.find(b => b.id === bookingId);
  const customerId = booking ? (booking.customerId % mockCustomers.length) + 1 : 1; // Ensure valid customerId


  mockInvoices.push({
    id: i,
    bookingId: bookingId,
    customerId: customerId,
    amount: Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000, // Random amount between 1M and 10M
    paymentMethod: paymentMethod,
    status: status,
    invoiceDate: getPastDate(Math.floor(Math.random() * 60)), // Random date within last 60 days
    notes: notes,
  });
}

// Mock Service Data
export const mockServices = [
  { id: 1, name: "Spa & Massage", price: 800000, description: "Dịch vụ spa và massage chuyên nghiệp." },
  { id: 2, name: "Đưa đón sân bay", price: 500000, description: "Xe đưa đón từ sân bay đến khách sạn và ngược lại." },
  { id: 3, name: "Ăn sáng Buffet", price: 250000, description: "Thưởng thức bữa sáng buffet đa dạng món Á Âu." },
  { id: 4, name: "Phòng họp", price: 3000000, description: "Cho thuê phòng họp với đầy đủ thiết bị." },
  { id: 5, name: "Tour tham quan", price: 1000000, description: "Tổ chức các tour du lịch tham quan địa phương." },
  { id: 6, name: "Giặt là", price: 100000, description: "Dịch vụ giặt là nhanh chóng và tiện lợi." },
  { id: 7, name: "Fitness Center", price: 0, description: "Phòng tập gym hiện đại (Miễn phí cho khách lưu trú)." },
  { id: 8, name: "Thuê xe máy", price: 150000, description: "Dịch vụ cho thuê xe máy tự lái." },
];

// Mock User Role Data
export const mockUserRoles = [
  { id: 1, username: "admin", role: "Admin Tổng", email: "admin@hotelluxury.com" },
  { id: 2, username: "lethungan", role: "Lễ tân", email: "lethungan@hotelluxury.com" },
  { id: 3, username: "nguyenvietanh", role: "Kế toán", email: "nguyenvietanh@hotelluxury.com" },
  { id: 4, username: "phamminhhoa", role: "Quản lý phòng", email: "phamminhhoa@hotelluxury.com" },
  { id: 5, username: "tranvantai", role: "Dịch vụ", email: "tranvantai@hotelluxury.com" },
];

// Updated Mock User Role Data with more details and edit permissions
export const updatedMockUserRoles = mockUserRoles.map(user => {
  let department = "Không rõ";
  let canEdit = false;
  let password = "password123"; // Temporary password for demo

  switch (user.role) {
    case "Admin Tổng":
      department = "Ban giám đốc";
      canEdit = true;
      break;
    case "Lễ tân":
      department = "Bộ phận Tiền sảnh";
      canEdit = true;
      break;
    case "Kế toán":
      department = "Bộ phận Tài chính";
      canEdit = true;
      break;
    case "Quản lý phòng":
      department = "Bộ phận Tiền sảnh";
      canEdit = true;
      break;
    case "Dịch vụ":
      department = "Bộ phận Dịch vụ";
      canEdit = true;
        break;
    // Add more cases for other roles
  }

  return {
    ...user,
    department: department,
    password: password, // Add temporary password
    canEdit: canEdit, // Add edit permission flag
  };
});

export interface UserRole {
  id: number;
  username: string;
  role: string;
  email: string;
  department?: string; // Make optional in case not all roles have department
  password?: string; // Make optional as not always needed
  canEdit?: boolean; // Make optional
} 