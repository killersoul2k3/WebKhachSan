import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input, Select, Button, Modal, Form, Pagination, Carousel, Descriptions } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export const mockRooms = [
  {
    id: 1,
    name: 'Phòng đơn',
    type: 'Đơn',
    price: 500000,
    location: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng đơn tiện nghi, phù hợp cho 1 người. Bao gồm đầy đủ nội thất cơ bản: giường đơn, tủ quần áo, bàn làm việc, TV, điều hòa, phòng tắm riêng. View thành phố hoặc sân trong.',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560185893-a55bebfe047b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đơn', 'Tủ quần áo', 'Bàn làm việc', 'TV', 'Điều hòa'],
    view: 'Thành phố/Sân trong',
    notes: 'Không hút thuốc trong phòng.',
    status: 'Đang sử dụng'
  },
  {
    id: 2,
    name: 'Phòng đôi',
    type: 'Đôi',
    price: 800000,
    location: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    season: 'Đông',
    description: 'Phòng đôi rộng rãi, view đẹp. Có 2 giường đơn hoặc 1 giường đôi lớn. Nội thất đầy đủ: giường, tủ, bàn trang điểm, minibar, phòng tắm với bồn tắm.',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đôi', 'Tủ quần áo', 'Minibar', 'TV', 'Điều hòa', 'Bồn tắm'],
    view: 'Hướng biển/Thành phố',
    notes: 'Có thể yêu cầu thêm giường phụ.',
    status: 'Trống'
  },
  {
    id: 3,
    name: 'Phòng VIP',
    type: 'VIP',
    price: 2000000,
    location: 'Nha Trang',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng VIP sang trọng, tiện nghi cao cấp. Không gian rộng, có khu vực tiếp khách riêng, view đẹp nhất khách sạn.',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường King size', 'Khu vực tiếp khách', 'Minibar cao cấp', 'TV màn hình lớn', 'Điều hòa', 'Bồn sục'],
    view: 'Toàn cảnh biển/Thành phố',
    notes: 'Bao gồm dịch vụ đưa đón sân bay.',
    status: 'Trống'
  },
  {
    id: 4,
    name: 'Phòng Tổng thống',
    type: 'Tổng thống',
    price: 5000000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    season: 'Xuân',
    description: 'Phòng Tổng thống đẳng cấp quốc tế, không gian cực rộng, có phòng họp nhỏ, bếp riêng, quản gia riêng.',
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường King size', 'Phòng họp', 'Bếp', 'Minibar cao cấp', 'TV màn hình lớn', 'Hệ thống âm thanh', 'Bồn sục Jacuzzi'],
    view: 'Toàn cảnh thành phố',
    notes: 'Bao gồm quản gia 24/7, dịch vụ phòng cao cấp.',
    status: 'Đang sử dụng'
  },
  {
    id: 5,
    name: 'Phòng view biển',
    type: 'View biển',
    price: 1500000,
    location: 'Vũng Tàu',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng view biển tuyệt đẹp, ban công riêng hướng ra biển.',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đôi', 'Ban công', 'Ghế thư giãn', 'Minibar', 'TV', 'Điều hòa', 'Phòng tắm'],
    view: 'Trực diện biển',
    notes: 'Thích hợp cho cặp đôi.',
    status: 'Trống'
  },
  {
    id: 6,
    name: 'Phòng gia đình',
    type: 'Gia đình',
    price: 1200000,
    location: 'Đà Lạt',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
    season: 'Thu',
    description: 'Phòng rộng cho cả gia đình, có 2 phòng ngủ riêng biệt hoặc giường tầng.',
    images: [
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đôi/đơn/tầng', 'Không gian chơi trẻ em', 'Minibar', 'TV', 'Điều hòa', '2 Phòng tắm'],
    view: 'Hướng đồi/Thành phố',
    notes: 'Có thể yêu cầu thêm nôi em bé.',
    status: 'Trống'
  },
  {
    id: 7,
    name: 'Phòng đơn Superior',
    type: 'Đơn',
    price: 650000,
    location: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1618773959530-be66ae920a70?auto=format&fit=crop&w=400&q=80',
    season: 'Đông',
    description: 'Phòng đơn nâng cấp với diện tích rộng hơn và tiện nghi tốt hơn.',
    images: [
      'https://images.unsplash.com/photo-1618773959530-be66ae920a70?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773959611-d5787f2e11e2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đơn lớn', 'Sofa', 'Tủ quần áo', 'Bàn làm việc', 'TV', 'Điều hòa', 'Phòng tắm'],
    view: 'Thành phố yên tĩnh',
    notes: 'Có thể yêu cầu giường phụ (tính phí).',
    status: 'Trống'
  },
  {
    id: 8,
    name: 'Phòng đôi Deluxe',
    type: 'Đôi',
    price: 950000,
    location: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed10c2cf?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng đôi cao cấp, thiết kế hiện đại và thoải mái.',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed10c2cf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595526114004-ee9512c545d6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đôi lớn', 'Sofa', 'Bàn trang điểm', 'Minibar', 'TV màn hình phẳng', 'Điều hòa', 'Phòng tắm tiện nghi'],
    view: 'Hướng phố biển',
    notes: 'Gần trung tâm.',
    status: 'Đang sử dụng'
  },
  {
    id: 9,
    name: 'Căn hộ Studio',
    type: 'VIP',
    price: 1800000,
    location: 'Nha Trang',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Căn hộ tiện nghi như ở nhà, có bếp nhỏ và khu vực sinh hoạt riêng.',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đôi', 'Khu vực bếp', 'Sofa', 'Bàn ăn', 'Tủ quần áo', 'TV', 'Điều hòa', 'Phòng tắm'],
    view: 'Thành phố',
    notes: 'Phù hợp cho lưu trú dài ngày.',
    status: 'Trống'
  },
  {
    id: 10,
    name: 'Penthouse Suite',
    type: 'Tổng thống',
    price: 10000000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=400&q=80',
    season: 'Đông',
    description: 'Penthouse sang trọng nhất khách sạn, view toàn cảnh thành phố từ trên cao, có bể bơi riêng.',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường King size', 'Bể bơi riêng', 'Khu vực tiếp khách', 'Phòng ăn', 'Bếp', 'Bar', 'TV lớn', 'Hệ thống âm thanh', 'Phòng tắm Master'],
    view: 'Toàn cảnh thành phố (cao nhất)',
    notes: 'Dịch vụ quản gia riêng 24/7.',
    status: 'Trống'
  },
  {
    id: 11,
    name: 'Phòng Garden View',
    type: 'Đôi',
    price: 850000,
    location: 'Đà Lạt',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=400&q=80',
    season: 'Xuân',
    description: 'Phòng có ban công hướng ra vườn cây xanh mát.',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773959611-d5787f2e11e2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đôi', 'Ban công', 'Ghế thư giãn', 'Minibar', 'TV', 'Điều hòa', 'Phòng tắm'],
    view: 'Hướng vườn',
    notes: 'Yên tĩnh, thoáng đãng.',
    status: 'Trống'
  },
  {
    id: 12,
    name: 'Phòng Deluxe Ocean Suite',
    type: 'View biển',
    price: 3500000,
    location: 'Vũng Tàu',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Suite cao cấp với phòng khách riêng và ban công lớn hướng biển.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường King size', 'Phòng khách', 'Ban công lớn', 'Minibar cao cấp', 'TV lớn', 'Điều hòa', 'Phòng tắm sang trọng'],
    view: 'Trực diện biển',
    notes: 'Lý tưởng cho tuần trăng mật.',
    status: 'Trống'
  },
  {
    id: 13,
    name: 'Phòng Executive City View',
    type: 'VIP',
    price: 2200000,
    location: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1618773959611-d5787f2e11e2?auto=format&fit=crop&w=400&q=80',
    season: 'Thu',
    description: 'Phòng Executive với view thành phố đẹp và các tiện ích nâng cao.',
    images: [
      'https://images.unsplash.com/photo-1618773959611-d5787f2e11e2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773959530-be66ae920a70?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80',
    ],
    interior: ['Giường đôi/King size', 'Khu vực làm việc', 'Ghế thư giãn', 'Minibar', 'TV', 'Điều hòa', 'Phòng tắm'],
    view: 'Thành phố',
    notes: 'Bao gồm ăn sáng tại Executive Lounge.',
    status: 'Trống'
  },
  {
    id: 14,
    name: 'Phòng Đơn Tiêu Chuẩn - HCM',
    type: 'Đơn',
    price: 750000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1566195992013-cf8d875c67e4?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Phòng đơn tiêu chuẩn tại trung tâm Sài Gòn.',
    images: ['https://images.unsplash.com/photo-1566195992013-cf8d875c67e4?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đơn', 'Tủ quần áo', 'Điều hòa'],
    view: 'Hướng phố',
    notes: 'Gần chợ Bến Thành.',
    status: 'Trống'
  },
  {
    id: 15,
    name: 'Phòng Đôi Superior - HCM',
    type: 'Đôi',
    price: 1100000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Phòng đôi thoải mái, thiết kế hiện đại.',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đôi lớn', 'Sofa', 'TV', 'Điều hòa'],
    view: 'Hướng thành phố',
    notes: 'Khu vực yên tĩnh.',
    status: 'Đang sử dụng'
  },
  {
    id: 16,
    name: 'Phòng Gia Đình - HCM',
    type: 'Gia đình',
    price: 1800000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Phòng rộng rãi cho gia đình 4 người.',
    images: ['https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['1 Giường đôi, 2 Giường đơn', 'Khu vui chơi trẻ em', '2 Phòng tắm'],
    view: 'Hướng thành phố',
    notes: 'Có phục vụ ăn sáng tại phòng.',
    status: 'Trống'
  },
  {
    id: 17,
    name: 'Phòng VIP City View - HCM',
    type: 'VIP',
    price: 3000000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Phòng VIP view đẹp nhìn ra trung tâm Sài Gòn.',
    images: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường King size', 'Khu vực tiếp khách', 'Minibar', 'TV lớn'],
    view: 'Toàn cảnh thành phố',
    notes: 'Bao gồm quyền sử dụng Executive Lounge.',
    status: 'Trống'
  },
  {
    id: 18,
    name: 'Suite Luxury - HCM',
    type: 'Luxury',
    price: 6000000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Suite sang trọng với nội thất cao cấp.',
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường King size', 'Phòng khách riêng', 'Bàn làm việc lớn', 'Minibar cao cấp', 'Phòng tắm sang trọng'],
    view: 'Hướng sông',
    notes: 'Dịch vụ phòng 24/7.',
    status: 'Trống'
  },
  {
    id: 19,
    name: 'Phòng Đơn Phổ Thông - Đà Nẵng',
    type: 'Đơn',
    price: 600000,
    location: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng đơn gần bãi biển, giá hợp lý.',
    images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đơn', 'Tủ quần áo', 'Điều hòa'],
    view: 'Hướng phố',
    notes: 'Đi bộ ra biển 5 phút.',
    status: 'Trống'
  },
  {
    id: 20,
    name: 'Phòng Đôi Hướng Biển - Đà Nẵng',
    type: 'Đôi',
    price: 1300000,
    location: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng đôi có ban công nhìn thẳng ra biển Đà Nẵng.',
    images: ['https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đôi', 'Ban công', 'Ghế thư giãn', 'Minibar'],
    view: 'Trực diện biển',
    notes: 'Thích hợp ngắm bình minh.',
    status: 'Trống'
  },
  {
    id: 21,
    name: 'Phòng Gia Đình Gần Biển - Đà Nẵng',
    type: 'Gia đình',
    price: 1600000,
    location: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng cho gia đình gần khu vực bãi biển Mỹ Khê.',
    images: ['https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đôi, 2 Giường đơn', 'Khu vực sinh hoạt chung'],
    view: 'Hướng phố',
    notes: 'Gần nhà hàng hải sản.',
    status: 'Trống'
  },
  {
    id: 22,
    name: 'Phòng VIP Panorama - Đà Nẵng',
    type: 'VIP',
    price: 3800000,
    location: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed10c2cf?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng VIP với cửa sổ kính lớn nhìn toàn cảnh thành phố và biển.',
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed10c2cf?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1595526114004-ee9512c545d6?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường King size', 'Sofa lớn', 'Minibar cao cấp', 'TV màn hình cong'],
    view: 'Toàn cảnh thành phố và biển',
    notes: 'Vị trí đắc địa.',
    status: 'Trống'
  },
  {
    id: 23,
    name: 'Executive Suite - Đà Nẵng',
    type: 'Suite',
    price: 4500000,
    location: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Executive Suite rộng rãi, tiện nghi công tác và nghỉ dưỡng.',
    images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường King size', 'Khu vực làm việc', 'Phòng khách nhỏ', 'Minibar', 'Phòng tắm lớn'],
    view: 'Hướng thành phố',
    notes: 'Bao gồm ăn sáng miễn phí.',
    status: 'Trống'
  },
  {
    id: 24,
    name: 'Phòng Đơn Tiết Kiệm - Hà Nội',
    type: 'Đơn',
    price: 550000,
    location: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1560185893-a55bebfe047b?auto=format&fit=crop&w=400&q=80',
    season: 'Thu',
    description: 'Phòng đơn gọn gàng, giá phải chăng tại Hà Nội.',
    images: ['https://images.unsplash.com/photo-1560185893-a55bebfe047b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đơn', 'Tủ quần áo'],
    view: 'Hướng sân trong',
    notes: 'Yên tĩnh.',
    status: 'Trống'
  },
  {
    id: 25,
    name: 'Phòng Đôi View Hồ Gươm - Hà Nội',
    type: 'Đôi',
    price: 1500000,
    location: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1618773959530-be66ae920a70?auto=format&fit=crop&w=400&q=80',
    season: 'Xuân',
    description: 'Phòng đôi với tầm nhìn tuyệt đẹp ra Hồ Gươm.',
    images: ['https://images.unsplash.com/photo-1618773959530-be66ae920a70?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1618773959611-d5787f2e11e2?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đôi lớn', 'Ban công', 'Ghế thư giãn'],
    view: 'Hướng Hồ Gươm',
    notes: 'Vị trí trung tâm.',
    status: 'Trống'
  },
  {
    id: 26,
    name: 'Phòng Gia Đình Phố Cổ - Hà Nội',
    type: 'Gia đình',
    price: 1900000,
    location: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
    season: 'Thu',
    description: 'Phòng cho gia đình tại khu vực Phố Cổ sầm uất.',
    images: ['https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['1 Giường đôi, 1 Giường tầng', 'Khu vực ăn uống nhỏ'],
    view: 'Hướng phố cổ',
    notes: 'Gần các điểm tham quan.',
    status: 'Trống'
  },
  {
    id: 27,
    name: 'Phòng VIP View Sông Hương - Huế',
    type: 'VIP',
    price: 2500000,
    location: 'Huế',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=400&q=80',
    season: 'Xuân',
    description: 'Phòng VIP yên bình nhìn ra Sông Hương.',
    images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1618773959611-d5787f2e11e2?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường King size', 'Ban công', 'Ghế bành'],
    view: 'Hướng Sông Hương',
    notes: 'Gần Cầu Tràng Tiền.',
    status: 'Trống'
  },
  {
    id: 28,
    name: 'Suite Hoàng Gia - Huế',
    type: 'Suite',
    price: 5500000,
    location: 'Huế',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=400&q=80',
    season: 'Xuân',
    description: 'Suite lấy cảm hứng từ kiến trúc cung đình Huế.',
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường King size chạm khắc', 'Phòng khách riêng', 'Nội thất gỗ', 'Bồn tắm lớn'],
    view: 'Hướng Kinh Thành',
    notes: 'Trải nghiệm đẳng cấp.',
    status: 'Trống'
  },
  {
    id: 29,
    name: 'Phòng Đơn Standard - Nha Trang',
    type: 'Đơn',
    price: 700000,
    location: 'Nha Trang',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng đơn cơ bản tại Nha Trang.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đơn', 'Tủ quần áo', 'Điều hòa'],
    view: 'Hướng phố',
    notes: 'Gần chợ đêm.',
    status: 'Đang sử dụng'
  },
  {
    id: 30,
    name: 'Phòng Đôi View Biển Nhỏ - Nha Trang',
    type: 'Đôi',
    price: 1400000,
    location: 'Nha Trang',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng đôi tại khu vực biển Non Nước.',
    images: ['https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đôi', 'Ban công', 'Minibar'],
    view: 'Hướng biển Non Nước',
    notes: 'Khu nghỉ dưỡng yên tĩnh.',
    status: 'Trống'
  },
  {
    id: 31,
    name: 'Phòng Đơn Gần Sân Bay - HCM',
    type: 'Đơn',
    price: 600000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Phòng đơn thuận tiện cho khách đi máy bay.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đơn', 'Tủ quần áo'],
    view: 'Hướng phố',
    notes: 'Có dịch vụ đưa đón sân bay (tính phí).',
    status: 'Trống'
  },
  {
    id: 32,
    name: 'Phòng Đôi Khu Phú Mỹ Hưng - HCM',
    type: 'Đôi',
    price: 1300000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Phòng đôi tại khu vực hiện đại Phú Mỹ Hưng.',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đôi lớn', 'Minibar', 'TV'],
    view: 'Hướng khu đô thị',
    notes: 'Gần trung tâm thương mại.',
    status: 'Trống'
  },
  {
    id: 33,
    name: 'Phòng Gia Đình Thảo Điền - HCM',
    type: 'Gia đình',
    price: 2500000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Phòng gia đình tại khu vực Thảo Điền yên tĩnh.',
    images: ['https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['1 Giường đôi, 2 Giường đơn', 'Không gian bếp nhỏ'],
    view: 'Hướng sông Sài Gòn',
    notes: 'Thích hợp cho kỳ nghỉ dài ngày.',
    status: 'Trống'
  },
  {
    id: 34,
    name: 'Phòng VIP Sông Sài Gòn - HCM',
    type: 'VIP',
    price: 4500000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Phòng VIP với tầm nhìn ra Sông Sài Gòn.',
    images: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường King size', 'Ban công', 'Khu vực tiếp khách'],
    view: 'Hướng Sông Sài Gòn',
    notes: 'Yên bình và lãng mạn.',
    status: 'Trống'
  },
  {
    id: 35,
    name: 'Luxury Apartment - HCM',
    type: 'Luxury',
    price: 9000000,
    location: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=400&q=80',
    season: 'Nắng',
    description: 'Căn hộ Luxury đầy đủ tiện nghi cao cấp.',
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9d2d566?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Nhiều phòng ngủ', 'Phòng khách lớn', 'Bếp đầy đủ', 'View đẹp'],
    view: 'Toàn cảnh thành phố',
    notes: 'Phù hợp cho gia đình hoặc nhóm bạn cao cấp.',
    status: 'Trống'
  },
  {
    id: 36,
    name: 'Phòng Đôi Gần Trung Tâm - Đà Nẵng',
    type: 'Đôi',
    price: 900000,
    location: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed10c2cf?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Phòng đôi ở khu vực trung tâm Đà Nẵng.',
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed10c2cf?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1595526114004-ee9512c545d6?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường đôi', 'Minibar', 'TV'],
    view: 'Hướng phố',
    notes: 'Thuận tiện đi lại.',
    status: 'Đang sử dụng'
  },
  {
    id: 37,
    name: 'Suite Hướng Biển Bãi Trước - Vũng Tàu',
    type: 'Suite',
    price: 4200000,
    location: 'Vũng Tàu',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    season: 'Hè',
    description: 'Suite cao cấp với view trực diện Bãi Trước.',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1540518614846-df623160335b?auto=format&fit=crop&w=600&q=80'],
    interior: ['Giường King size', 'Phòng khách riêng', 'Ban công lớn', 'Minibar cao cấp'],
    view: 'Trực diện Bãi Trước',
    notes: 'Gần công viên.',
    status: 'Trống'
  },
];

const roomTypes = ['Đơn', 'Đôi', 'VIP', 'Tổng thống', 'View biển', 'Gia đình'];
const seasons = ['Hè', 'Đông', 'Xuân', 'Thu'];
const locations = ['Hà Nội', 'Đà Nẵng', 'Nha Trang', 'Hồ Chí Minh', 'Vũng Tàu', 'Đà Lạt'];

const RoomTypesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string | undefined>(undefined);
  const [season, setSeason] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8; // Số phòng mỗi trang

  const navigate = useNavigate();

  const filteredRooms = mockRooms.filter(room => {
    return (
      (!search || room.name.toLowerCase().includes(search.toLowerCase())) &&
      (!type || room.type === type) &&
      (!season || room.season === season) &&
      (!location || room.location === location) &&
      (!price || room.price <= price)
    );
  });

  // Logic phân trang
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: 32, background: '#f5f6fa', minHeight: '100vh' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Button icon={<HomeOutlined />} onClick={() => navigate('/')}>Về trang chủ</Button>
        </Col>
        <Col>
          <h1>Danh sách các loại phòng</h1>
        </Col>
      </Row>
      <Form layout="inline" style={{ marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <Form.Item label="Tìm kiếm">
          <Input placeholder="Tên phòng, tour..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 180 }} />
        </Form.Item>
        <Form.Item label="Loại phòng">
          <Select allowClear placeholder="Chọn loại phòng" style={{ width: 150 }} value={type} onChange={setType}>
            {roomTypes.map(rt => <Option key={rt} value={rt}>{rt}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Địa điểm">
          <Select allowClear placeholder="Chọn địa điểm" style={{ width: 150 }} value={location} onChange={setLocation}>
            {locations.map(l => <Option key={l} value={l}>{l}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Giá tối đa">
          <Input type="number" placeholder="VNĐ" value={price} onChange={e => setPrice(Number(e.target.value))} style={{ width: 150 }} />
        </Form.Item>
        <Form.Item label="Mùa du lịch">
          <Select allowClear placeholder="Chọn mùa" style={{ width: 150 }} value={season} onChange={setSeason}>
            {seasons.map(s => <Option key={s} value={s}>{s}</Option>)}
          </Select>
        </Form.Item>
      </Form>
      <Row gutter={[24, 24]}>
        {currentRooms.map(room => (
          <Col key={room.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={room.name} src={room.image} style={{ height: 180, objectFit: 'cover' }} />}
              onClick={() => navigate(`/rooms/${room.id}`)} // Chuyển hướng sang trang chi tiết
            >
              <Card.Meta title={room.name} description={<>
                <div>Loại: {room.type}</div>
                <div>Địa điểm: {room.location}</div>
                <div>Giá: {room.price.toLocaleString()} VNĐ</div>
                <div>Mùa gợi ý: {room.season}</div>
              </>} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={roomsPerPage}
        total={filteredRooms.length}
        onChange={handlePageChange}
        style={{ marginTop: 24, textAlign: 'center' }}
      />
    </div>
  );
};

export default RoomTypesPage; 