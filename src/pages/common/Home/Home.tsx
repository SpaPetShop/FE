import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PetCard from "../../../components/home/component/card/PetCard";
import FeaturedTitle from "../../../components/common/highlight/FeaturedTitle";
import "./Home.css";
import SubProductAPI from "../../../utils/SubProductAPI";
import {
  FilterProductType,
  ProductType,
  ProductResponse,
} from "../../../types/Product/ProductType";
import { PaginationType } from "../../../types/CommonType";
import PetImageGallery from "../../../components/home/component/gallery/PetImageGallery";
import LoadingComponentVersion2 from "../../../components/common/loading/Backdrop";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
  const [filter, setFilter] = useState<FilterProductType>({
    page: 1,
    size: 1000,
    Status: "Available",
  });
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    size: 1000,
    total: 0,
    totalPages: 1,
  });

  const fetchAllProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: ProductResponse = await SubProductAPI.getAll(filter);
      console.log({ data });
      setListProduct(data.items);
      setPagination({
        page: data.page,
        size: data.size,
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (error: any) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct]);

  const defaultPetData = {
    image: [
      {
        imageURL: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
      }
    ],
    duration: "30 phút",
    rate: "4.5",
    availability: "Còn chỗ",
  };

  return (
    <div className="container">
      <LoadingComponentVersion2 open={isLoading} />
      <FeaturedTitle
        title={"BOSS DỊCH VỤ"}
        subtitle={"Các loại dịch vụ chăm sóc cho thú cưng của bạn"}
      />

      {/* Dịch vụ cho cún */}
      <section className="section">
        <h2 className="title">Dịch vụ cho cún</h2>
        <Grid container spacing={3}>
          {listProduct
            .filter((product) => product.category.name === "Chó")
            .map((product) => (
              <PetCard
                key={product.id}
                pet={{
                  id: product.id,
                  name: product.name,
                  stockPrice: product.stockPrice,
                  sellingPrice: product.sellingPrice,
                  status: product.status,
                  category: product.category,
                  image: product?.image?.[0]?.imageURL ? product.image[0].imageURL : defaultPetData.image[0].imageURL,
                }}
              />
            ))}
        </Grid>
      </section>

      {/* Dịch vụ cho mèo */}
      <section className="section">
        <h2 className="title">Dịch vụ cho mèo</h2>
        <Grid container spacing={3}>
          {listProduct
            .filter((product) => product.category.name === "Mèo")
            .map((product) => (
              <PetCard
                key={product.id}
                pet={{
                  id: product.id,
                  name: product.name,
                  stockPrice: product.stockPrice,
                  sellingPrice: product.sellingPrice,
                  status: product.status,
                  category: product.category,
                  image: product?.image?.[0]?.imageURL ? product.image[0].imageURL : defaultPetData.image[0].imageURL,
                }}
              />
            ))}
        </Grid>
      </section>

      {/* Dịch vụ cho vẹt */}
      <section className="section">
        <h2 className="title">Dịch vụ cho vẹt</h2>
        <Grid container spacing={3}>
          {listProduct
            .filter((product) => product.category.name === "Vẹt")
            .map((product) => (
              <PetCard
                key={product.id}
                pet={{
                  id: product.id,
                  name: product.name,
                  stockPrice: product.stockPrice,
                  sellingPrice: product.sellingPrice,
                  status: product.status,
                  category: product.category,
                  image: product?.image?.[0]?.imageURL ? product.image[0].imageURL : defaultPetData.image[0].imageURL,
                }}
              />
            ))}
        </Grid>
      </section>

      {/* Dịch vụ cho thỏ */}
      <section className="section">
        <h2 className="title">Dịch vụ cho thỏ</h2>
        <Grid container spacing={3}>
          {listProduct
            .filter((product) => product.category.name === "Thỏ")
            .map((product) => (
              <PetCard
                key={product.id}
                pet={{
                  id: product.id,
                  name: product.name,
                  stockPrice: product.stockPrice,
                  sellingPrice: product.sellingPrice,
                  status: product.status,
                  category: product.category,
                  image: product?.image?.[0]?.imageURL ? product.image[0].imageURL : defaultPetData.image[0].imageURL,
                }}
              />
            ))}
        </Grid>
      </section>

      <FeaturedTitle
        title={"KHOẢNH KHẮC THÚ CƯNG"}
        subtitle={"PET LIKE US AND SO WILL YOU"}
      />
      <PetImageGallery />
    </div>
  );
};

export default Home;