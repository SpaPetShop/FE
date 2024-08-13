import React, { useState } from "react";
import "./Booking.css";
import servicesData from "../../assets/data/booking/index.json";
import FeaturedTitle from "../home/component/highlight/FeaturedTitle";

interface ServiceCategory {
  category: string;
  subcategories: { name: string; price: string }[];
}

const Booking: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [showWeightOptions, setShowWeightOptions] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    petType: "",
    petWeight: "",
    serviceCategory: "",
    serviceSubcategory: "",
    date: "",
    time: "",
    delivery: false,
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setFormData({
      ...formData,
      serviceCategory: category,
      serviceSubcategory: "",
    });
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setFormData({ ...formData, serviceSubcategory: subcategory });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form validation logic here
    console.log(formData);
  };

  const getSelectedServicePrice = () => {
    if (!selectedCategory || !selectedSubcategory) return null;
    const category = servicesData.services.find(
      (service) => service.category === selectedCategory
    );
    const subcategory = category?.subcategories.find(
      (sub) => sub.name === selectedSubcategory
    );
    return subcategory?.price || null;
  };

  return (
    <>
      <FeaturedTitle title="ĐĂNG KÝ DỊCH VỤ" />
      <form className="booking-form" onSubmit={handleSubmit}>
        <label htmlFor="petType">Boss là:</label>
        <div>
          <input
            type="radio"
            name="petType"
            value="Cún"
            onChange={(e) => {
              handleInputChange(e);
              setShowWeightOptions(true);
            }}
          />{" "}
          Cún
          <input
            type="radio"
            name="petType"
            value="Mèo"
            onChange={(e) => {
              handleInputChange(e);
              setShowWeightOptions(true);
            }}
          />{" "}
          Mèo
        </div>

        {showWeightOptions && (
          <>
            <label>Số kg của boss:</label>
            <div>
              <input
                type="radio"
                name="petWeight"
                value="1-5 kg"
                onChange={handleInputChange}
              />{" "}
              1-5 kg
              <input
                type="radio"
                name="petWeight"
                value="5-10 kg"
                onChange={handleInputChange}
              />{" "}
              5-10 kg
              <input
                type="radio"
                name="petWeight"
                value="10-20 kg"
                onChange={handleInputChange}
              />{" "}
              10-20 kg
              <input
                type="radio"
                name="petWeight"
                value="20+ kg"
                onChange={handleInputChange}
              />{" "}
              20+ kg
            </div>
          </>
        )}

        <label htmlFor="serviceCategory">Dịch vụ cho Boss:</label>
        <select
          name="serviceCategory"
          value={formData.serviceCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Chọn dịch vụ</option>
          {servicesData.services.map((service, index) => (
            <option key={index} value={service.category}>
              {service.category}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <>
            <label htmlFor="serviceSubcategory">Chọn dịch vụ:</label>
            <select
              name="serviceSubcategory"
              value={formData.serviceSubcategory}
              onChange={(e) => handleSubcategoryChange(e.target.value)}
            >
              <option value="">Chọn dịch vụ</option>
              {servicesData.services
                .find((service) => service.category === selectedCategory)
                ?.subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory.name}>
                    {subcategory.name} - {subcategory.price}
                  </option>
                ))}
            </select>
          </>
        )}

        <label htmlFor="date">Chọn ngày:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />

        <label htmlFor="time">Chọn giờ:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
        />

        <h3>THÔNG TIN CỦA SEN</h3>

        <label htmlFor="name">Họ và tên:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="phone">Số điện thoại:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <div className="delivery-option">
          <input
            type="checkbox"
            name="delivery"
            checked={formData.delivery}
            onChange={handleInputChange}
          />
          <span className="delivery-option-addtional">
            Trạm qua tận nhà đưa đón bé (Freeship dưới 3km, trên 3km tính phí
            ship theo giá Grab hiện tại)
          </span>
        </div>

        {selectedSubcategory && (
          <div className="service-price">
            <p>Tổng tiền dịch vụ của sen: <span>{getSelectedServicePrice()}</span></p>
          </div>
        )}

        <button type="submit" className="booking-submit-button">
          Đặt lịch ngay
        </button>
      </form>
    </>
  );
};

export default Booking;
