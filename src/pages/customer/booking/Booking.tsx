import React, { useState, useEffect } from "react";
import "./Booking.css";
import FeaturedTitle from "../../../components/common/highlight/FeaturedTitle";
import PetAPI from "../../../utils/PetAPI";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addDays } from "date-fns";
import { Pet, PetType } from "../../../types/PetType/PetType";
import { StaffMember } from "../../../types/User/Staff";
import { useNavigate } from "react-router-dom";
import BookingAPI from "../../../utils/BookingAPI";

// Create a date that is 1 day after the current date
const minDate = addDays(new Date(), 1);

// Yup validation schemas
const petValidationSchema = Yup.object({
  petName: Yup.string().required("Tên boss không được để trống!"),
  petWeight: Yup.number()
    .required("Số kg của boss không được để trống!")
    .min(1, "Số kg phải là số dương!"),
  petAge: Yup.number()
    .required("Tuổi của boss không được để trống!")
    .min(0, "Tuổi phải là số dương!"),
  petTypeId: Yup.string().required("Vui lòng chọn loại boss!"),
});

const bookingValidationSchema = Yup.object({
  date: Yup.date()
    .required("Chọn ngày không được để trống!")
    .min(
      minDate,
      "Ngày đặt lịch cần cách ngày hiện tại ít nhất 24h để chúng tôi chuẩn bị dịch vụ một cách tốt nhất ạ!"
    ),
  time: Yup.string().required("Chọn giờ không được để trống!"),
  staffId: Yup.string().required("Chọn nhân viên không được để trống!"),
});

const Booking: React.FC = () => {
  const selectedPet = JSON.parse(localStorage.getItem("selectedPet") || "{}");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate();

  const [showServiceForm, setShowServiceForm] = useState<boolean>(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState<boolean>(false);
  const [petList, setPetList] = useState<Pet[]>([]);
  const [petTypes, setPetTypes] = useState<PetType[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  // Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      petName: "",
      petWeight: "",
      petAge: "",
      petTypeId: "",
      selectedPetId: "",
      serviceCategory: selectedPet.name || "",
      date: "",
      time: "",
      delivery: false,
      staffId: "",
      quantity: 1,
      note: "",
      description: "",
    },
    validationSchema: showServiceForm
      ? bookingValidationSchema
      : petValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!showServiceForm) {
        await handlePetSubmit(values);
      } else {
        await handleBookingSubmit(values);
        resetForm();
        localStorage.removeItem("petId");
        localStorage.removeItem("selectedPet");
      }
    },
  });

  useEffect(() => {
    // Fetch pet types from the API
    const fetchPetTypes = async () => {
      try {
        const response = await BookingAPI.getPetTypes();
        setPetTypes(response.items);
      } catch (error) {
        console.error("Error fetching pet types:", error);
      }
    };

    // Fetch staff list from the API
    const fetchStaffList = async () => {
      try {
        const response = await BookingAPI.getStaffList();
        setStaffList(
          response.items.filter((staff: any) => staff.status === "ACTIVE")
        );
      } catch (error) {
        console.error("Error fetching staff list:", error);
      }
    };

    fetchStaffList();
    fetchPetTypes();
  }, []);

  // Fetch pet list from the API
  useEffect(() => {
    const fetchPetList = async () => {
      try {
        const response = await PetAPI.getPetsByCustomerId(userData.id);
        setPetList(response.items);
      } catch (error) {
        console.error("Error fetching pet list:", error);
      }
    };
    fetchPetList();
  }, [userData.id]);

  const handlePetSubmit = async (values: any) => {
    try {
      // If the pet is already in the list, show the service form
      const existingPet = petList.find((pet) => pet.name === values.petName);
      if (existingPet) {
        localStorage.setItem("petId", existingPet.id);
        setShowServiceForm(true);
      } else {
        const petId: any = await BookingAPI.createPet({
          name: values.petName,
          weight: values.petWeight,
          age: values.petAge,
          image:
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          typePetId: values.petTypeId,
        });
        localStorage.setItem("petId", petId);
        setShowServiceForm(true);
      }
    } catch (error) {
      console.error("Error creating pet:", error);
      toast.error("Tên boss đã tồn tại, vui lòng chọn tên khác!");
    }
  };

  const handleBookingSubmit = async (values: any) => {
    try {
      const petId = localStorage.getItem("petId");
      await BookingAPI.createBooking({
        productList: [
          {
            productId: selectedPet.id,
            quantity: values.quantity,
            sellingPrice: selectedPet.sellingPrice,
          },
        ],
        excutionDate: `${values.date}T${values.time}`,
        note: values.note,
        description: values.description,
        type: "CUSTOMERREQUEST",
        petId: petId,
        staffId: values.staffId,
      });
      toast.success("Đặt lịch thành công!");
      setIsBookingSuccess(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Lỗi khi đặt lịch!");
    }
  };

  // Handle Pet selection change
  const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPetId = event.target.value;
    const selectedPet = petList.find((pet) => pet.id === selectedPetId);

    if (selectedPet) {
      formik.setFieldValue("petName", selectedPet.name);
      formik.setFieldValue("petWeight", selectedPet.weight);
      formik.setFieldValue("petAge", selectedPet.age);
      formik.setFieldValue("petTypeId", selectedPet.typePet.id);
    }

    formik.handleChange(event);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <FeaturedTitle title="ĐĂNG KÝ DỊCH VỤ" />
      {!showServiceForm ? (
        <form className="booking-form" onSubmit={formik.handleSubmit}>
          <h2>THÔNG TIN CỦA BOSS</h2>

          <label htmlFor="selectedPetId">Chọn Boss đã đăng ký:</label>
          <select
            name="selectedPetId"
            value={formik.values.selectedPetId}
            onChange={handlePetChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Chọn Boss</option>
            {petList.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name} - {pet.typePet.name}
              </option>
            ))}
          </select>
          {formik.touched.selectedPetId && formik.errors.selectedPetId && (
            <div className="error">{formik.errors.selectedPetId}</div>
          )}

          <label htmlFor="petName">Họ và tên Boss:</label>
          <input
            type="text"
            name="petName"
            value={formik.values.petName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.petName && formik.errors.petName && (
            <div className="error">{formik.errors.petName}</div>
          )}

          <label htmlFor="petTypeId">Boss là:</label>
          <div>
            {petTypes.map((petType) => (
              <label key={petType.id}>
                <input
                  type="radio"
                  name="petTypeId"
                  value={petType.id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {petType.name}
              </label>
            ))}
          </div>
          {formik.touched.petTypeId && formik.errors.petTypeId && (
            <div className="error">{formik.errors.petTypeId}</div>
          )}

          <label>Số kg của boss:</label>
          <input
            type="number"
            name="petWeight"
            value={formik.values.petWeight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.petWeight && formik.errors.petWeight && (
            <div className="error">{formik.errors.petWeight}</div>
          )}

          <label>Tuổi của boss:</label>
          <input
            type="number"
            name="petAge"
            value={formik.values.petAge}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.petAge && formik.errors.petAge && (
            <div className="error">{formik.errors.petAge}</div>
          )}

          <button type="submit" className="booking-submit-button">
            Tiếp theo
          </button>
        </form>
      ) : (
        <form className="booking-form" onSubmit={formik.handleSubmit}>
          <h3>DỊCH VỤ ĐÃ CHỌN</h3>

          <h4>BOSS {formik.values.petName} đã đặt gói dịch vụ sau</h4>

          <label htmlFor="serviceCategory">Tên dịch vụ:</label>
          <p>{selectedPet.name}</p>

          <label htmlFor="price">
            Giá dịch vụ (cọc trước):{" "}
            <span className="price-additional">
              *Số tiền còn lại sẽ thanh toán khi Boss được chăm sóc xong nhé!
            </span>
          </label>
          <p>{(selectedPet.sellingPrice * 20) / 100} VNĐ</p>

          <label htmlFor="date">Chọn ngày:</label>
          <input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.date && formik.errors.date && (
            <div className="error">{formik.errors.date}</div>
          )}

          <label htmlFor="time">Chọn giờ:</label>
          <input
            type="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.time && formik.errors.time && (
            <div className="error">{formik.errors.time}</div>
          )}

          <label htmlFor="staffId">Chọn nhân viên:</label>
          <select
            name="staffId"
            value={formik.values.staffId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            <option value="">Chọn nhân viên</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.fullName}
              </option>
            ))}
          </select>
          {formik.touched.staffId && formik.errors.staffId && (
            <div className="error">{formik.errors.staffId}</div>
          )}

          <label htmlFor="note">Ghi chú:</label>
          <textarea
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.note && formik.errors.note && (
            <div className="error">{formik.errors.note}</div>
          )}

          <label htmlFor="description">Mô tả:</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}

          <div className="delivery-option">
            <input
              type="checkbox"
              name="delivery"
              checked={formik.values.delivery}
              onChange={formik.handleChange}
            />
            <span className="delivery-option-additional">
              Trạm qua tận nhà đưa đón bé (Freeship dưới 3km, trên 3km tính phí
              ship theo giá Grab hiện tại)
            </span>
          </div>

          <button type="submit" className="booking-submit-button">
            Đặt lịch ngay
          </button>

          {isBookingSuccess && (
            <div className="action-buttons">
              <button
                type="button"
                className="navigate-button"
                onClick={handleNavigateHome}
              >
                Trở về trang chủ
              </button>
              <button type="button" className="navigate-button">
                Xem dịch vụ của tôi
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default Booking;
