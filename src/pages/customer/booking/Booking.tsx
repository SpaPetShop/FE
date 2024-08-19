import React, { useState, useEffect } from "react";
import "./Booking.css";
import FeaturedTitle from "../../../components/common/highlight/FeaturedTitle";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addDays } from "date-fns";

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
  petTypeId: Yup.string().required("Loài của boss không được để trống!"),
});

const bookingValidationSchema = Yup.object({
  date: Yup.date()
    .required("Chọn ngày không được để trống!")
    .min(minDate, "Ngày đặt lịch cần cách ngày hiện tại ít nhất 24h để chúng tôi chuẩn bị dịch vụ một cách tốt nhất ạ!"),
  time: Yup.string().required("Chọn giờ không được để trống!"),
  staffId: Yup.string().required("Chọn nhân viên không được để trống!"),
  quantity: Yup.number()
    .required("Số lượng không được để trống!")
    .min(1, "Số lượng phải là số dương!"),
  note: Yup.string().required("Ghi chú không được để trống!"),
  description: Yup.string().required("Mô tả không được để trống!"),
});

interface PetType {
  id: string;
  name: string;
  description: string;
}

interface StaffMember {
  id: string;
  fullName: string;
  status: string;
}

const Booking: React.FC = () => {
  const selectedPet = JSON.parse(localStorage.getItem("selectedPet") || "{}");

  const [showServiceForm, setShowServiceForm] = useState<boolean>(false);
  const [petTypes, setPetTypes] = useState<PetType[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  // Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      petName: "",
      petWeight: "",
      petAge: "",
      petTypeId: "",
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
    onSubmit: async (values) => {
      if (!showServiceForm) {
        await handlePetSubmit(values);
      } else {
        await handleBookingSubmit(values);
      }
    },
  });

  // Fetch pet types from the API
  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const response = await axios.get(
          "http://spapet.vinhuser.one:1234/api/v1/typePet?Status=ACTIVE"
        );
        setPetTypes(response.data.items);
      } catch (error) {
        console.error("Error fetching pet types:", error);
      }
    };
    fetchPetTypes();
  }, []);

  // Fetch staff list from the API
  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await axios.get(
          "http://spapet.vinhuser.one:1234/api/v1/accounts?Role=STAFF"
        );
        setStaffList(
          response.data.items.filter(
            (staff: any) => staff.status === "ACTIVE"
          )
        );
      } catch (error) {
        console.error("Error fetching staff list:", error);
      }
    };
    fetchStaffList();
  }, []);

  const handlePetSubmit = async (values: any) => {
    // Retrieve userData from localStorage and extract the accessToken
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const accessToken = userData.accessToken;

    if (!accessToken) {
      toast.error("Người dùng chưa đăng nhập!");
      return;
    }

    try {
      // Create a new pet using the API with Authorization header
      const petResponse = await axios.post(
        "http://spapet.vinhuser.one:1234/api/v1/pet",
        {
          name: values.petName,
          weight: values.petWeight,
          age: values.petAge,
          image:
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          typePetId: values.petTypeId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      localStorage.setItem("petId", petResponse.data);

      // After successful pet creation, show the service form
      setShowServiceForm(true);
    } catch (error) {
      console.error("Error creating pet:", error);
      toast.error("Tên boss đã tồn tại, vui lòng chọn tên khác!");
    }
  };

  const handleBookingSubmit = async (values: any) => {
    try {
      const petId = localStorage.getItem("petId");

      // Create a new booking using the API
      await axios.post("http://spapet.vinhuser.one:1234/api/v1/orders", {
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
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Lỗi khi đặt lịch!");
    }
  };

  return (
    <>
      <FeaturedTitle title="ĐĂNG KÝ DỊCH VỤ" />
      {!showServiceForm ? (
        <form className="booking-form" onSubmit={formik.handleSubmit}>
          <h2>THÔNG TIN CỦA BOSS</h2>

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

          <label htmlFor="quantity">Số lượng:</label>
          <input
            type="number"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <div className="error">{formik.errors.quantity}</div>
          )}

          <label htmlFor="price">
            Giá dịch vụ (cọc trước):{" "}
            <span className="price-addtional">
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

          <button type="submit" className="booking-submit-button">
            Đặt lịch ngay
          </button>
        </form>
      )}
    </>
  );
};

export default Booking;