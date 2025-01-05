import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import { toast } from 'react-toastify';
import { collection, query, orderBy, onSnapshot, Timestamp, addDoc, setDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

function MyState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';

    }
  }

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  })

  // Add Product on Admin dashboard 

  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error(" Please fill all Fields ");
    }

    setLoading(true);

    try {
      const productRef = collection(fireDB, "products"); // yahan product ka reference bnaya aur usme hai collection jo two cheezein leta hai database name aur collection name
      await addDoc(productRef, products) // product ko add karne ke liye addDoc use kra , addDoc do cheezein leta hai ekk toh jo reference aapne banaya aur doosera jo hame add karna hai 
      toast.success("Product added Successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800)
      getProductData();
      setLoading(false);


    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setProducts("");

  }

  const [product, setProduct] = useState([]);

  // get Products on admin dashboard

  const getProductData = async () => {
    setLoading(true);
    try {

      const q = query(
        collection(fireDB, "products"), //query jo hai wo collection ka data ko lekar aata hai 
        orderBy('time'), // product ko order wise dikhane ke liye 
      )

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id }) // product array mai data add kardiye aur ekk id add kardiye
        });
        setProduct(productArray);
        setLoading(false);

        return () => data;


      })



    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }


  // Update Product Function 

  const edithandle = (item) => {
    setProducts(item);
  }

  const updateProduct = async (item) => {
    setLoading(true);
    try {

      setDoc(doc(fireDB, 'products', products.id), products);
      toast.success(" Product Updated Successfully ");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800)
      getProductData(); // jisse instantly update ho jaaye
      setLoading(false);


    } catch (error) {
      console.log(error);
      setLoading(false);


    }

  }

  // Delete Product Function

  const deleteProduct = async (item) => {

    setLoading(true);

    try {
      await deleteDoc(doc(fireDB, 'products', item.id));
      toast.success("Product Deleted Successfully");
      getProductData();
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false);

    }

  }

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      //console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      //console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, [])

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')



  return (
    <MyContext.Provider value={{
      mode,toggleMode,loading,setLoading,
      products,setProducts,addProduct,product,
      edithandle, updateProduct, deleteProduct
      ,order,user,searchkey,setSearchkey,
      filterType,setFilterType,filterPrice,setFilterPrice
    }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState;
