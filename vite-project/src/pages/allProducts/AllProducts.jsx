import React, { useContext, useEffect } from 'react'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import {toast} from 'react-toastify';


function Allproducts() {
  const context = useContext(MyContext)
  const { mode, product ,searchkey, setSearchkey,filterType,setFilterType,
      filterPrice,setFilterPrice} = context

  const dispatch = useDispatch()
  const cartItems = useSelector((state)=> state.cart);
  //console.log(cartItems)

  const addCart = (product)=> {
      dispatch(addToCart(product));
      toast.success('add to cart');

  }

  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Filter/>
      {/* <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {product.filter((obj)=> obj.title.toLowerCase().includes(searchkey))
                     .filter((obj) => obj.category.toLowerCase().includes(filterType))
                     .filter((obj) => obj.price.includes(filterPrice)).map((item, index) => {
                        const { title, price, description, imageUrl,id } = item;
                        return (
                            <div onClick={()=> window.location.href = `/productinfo/${id}`}   key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                    <div className="flex justify-center cursor-pointer" >
                                        <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageUrl} alt="blog" />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                      
                                        <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                                        <div className=" flex justify-center">
                                            <button type="button" 
                                            onClick={()=> addCart(item)}
                                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>

                                        </div>
                                    </div>

                                </div>
                            </div>


                        



                        )
                    })}




                </div>

            </div>
        </section > */}

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


    </Layout>
  )
}

export default Allproducts