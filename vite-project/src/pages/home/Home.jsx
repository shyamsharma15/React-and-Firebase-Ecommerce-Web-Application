import Layout from '../../components/layout/Layout';
import React,{useContext} from 'react';
import MyContext from '../../context/data/MyContext';
import HeroSection from '../../components/heroSection/HeroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
import {useDispatch , useSelector} from 'react-redux';
import {addToCart , deleteFromCart} from '../../redux/cartSlice';
import { Link } from 'react-router-dom'
import Track from '../../components/track/Track';


function Home() {
  const context = useContext(MyContext);
  //console.log(context);
 // const {name,rollno,classs} = context;
const{state,colour} = context;
const dispatch = useDispatch();
const cartItem = useSelector((state) => state.cart);

//console.log(cartItem);

const addCart = () => {
  dispatch(addToCart("shoes"));

}

const deleteCart = () =>{
  dispatch(deleteFromCart("shoes"));
}


  return (
    <Layout>
     <HeroSection/>
     <Filter/>
     <ProductCard/>
     <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <Track/>
     <Testimonial/>
    </Layout>
  )
}

export default Home;
