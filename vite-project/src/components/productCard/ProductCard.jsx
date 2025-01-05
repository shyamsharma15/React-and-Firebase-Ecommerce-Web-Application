
import React, { useContext, useEffect } from "react";
import MyContext from "../../context/data/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

function ProductCard() {
  const context = useContext(MyContext);
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product Added Successfully in cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product
            .filter((obj) =>
              obj.title.toLowerCase().includes(searchkey.toLowerCase())
            )
            .filter((obj) =>
              obj.category.toLowerCase().includes(filterType.toLowerCase())
            )
            .filter((obj) => obj.price.includes(filterPrice))
            .map((item, index) => {
              const { title, price, imageUrl, id } = item;

              return (
                <div
                  key={index}
                  className="drop-shadow-lg bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                  
                >
                  {/* Image with Fixed Aspect Ratio */}
                  <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 cursor-pointer" onClick={() => window.location.href = `/productinfo/${id}`}>
                    <img
                      src={imageUrl}
                      alt="product"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h2 className="text-sm text-gray-500 dark:text-gray-400">
                      E-Bazaar
                    </h2>
                    <h1 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                      {title}
                    </h1>
                    <p className="mt-2 text-pink-600 font-semibold">
                      ₹ {price}
                    </p>
                    <button
                      onClick={() => addCart(item)}
                      className="mt-4 w-full text-white bg-pink-600 hover:bg-pink-700 font-medium rounded-lg text-sm py-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
