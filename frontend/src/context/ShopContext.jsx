// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import axios from 'axios';




// export const ShopContext = createContext();


// const ShopContextProvider = (props) => {

//     const currency = '₱';
//     const delivery_fee = 45;
//     const backendUrl =  import.meta.env.VITE_BACKEND_URL
//     const [search,setSearch] = useState('');
//     const [showSearch,setShowSearch] = useState(false)
//     const [cartItems,setCartItems] = useState({});
//     const [products,setProducts] = useState([]);
//     const [token,setToken] = useState('')
//     const navigate = useNavigate();


//     const addToCart = async (itemId) => {

//         let cartData = structuredClone(cartItems);

//         if(cartData[itemId]) {
//             cartData[itemId] += 1;
//         }
//         else {
//             cartData[itemId] = {};
//             cartData[itemId] = 1;
//         }

//         setCartItems(cartData);

//         if (token) {
//             try {
                

//                 await axios.post(backendUrl + '/api/cart/add', {itemId}, {headers:{token}})
//             } catch (error) {
//                 console.log(error)
//                 toast.error(error.message)
//             }
//         }
//     }

    
//     const getCartCount = () => {
//         let totalCount = 0;
//         for(const items in cartItems){{
//                 try {
//                     if(cartItems[items] > 0) {
//                         totalCount += cartItems[items];

//                     }
                    
//                 } catch (error) {
                    
//                 }
//             }
//         }
//         return totalCount;

//     }

    
//     const updateQuantity = async (itemId,quantity) => {
//         let cartData = structuredClone(cartItems);

//         cartData[itemId] = quantity;

//         setCartItems(cartData);

//         if (token) {

//             try {
                
//                 await axios.post(backendUrl + '/api/cart/update', {itemId,quantity}, {headers:{token}})
//             } catch (error) {
//                 console.log(error)
//                 toast.error(error.message)
//             }
            
//         }

//     }

//     const getCartAmount = () => {
//         let totalAmount = 0;
//         for(const items in cartItems){
//             let itemInfo = products.find((product)=> product._id === items );
//                 try {
//                     if(cartItems[items] > 0){
//                         totalAmount += itemInfo.price * cartItems[items];

//                     }
//                 } catch (error) {
                    
//                 }
//             }
        
//         return totalAmount;
//     }

//     const getProductsData = async () => {
//         try {

//             const response = await axios.get(backendUrl + '/api/product/list')
//             if (response.data.success) {
//                 setProducts(response.data.products)
//             } else {
//                 toast.error(response.data.message)
//             }
            
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     const getUserCart = async ( token ) => {
//         try {
            
//             const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
//             if (response.data.success) {
//                 setCartItems(response.data.cartData)
                
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }

//     }
    

//     useEffect(()=>{
//         getProductsData()
//     },[])

//     useEffect(()=>{
//         if (!token && localStorage.getItem('token')) {
//             setToken(localStorage.getItem('token'))
//             getUserCart(localStorage.getItem('token'))
//         }

//     },[])



//     const value = {
//         products , currency , delivery_fee,
//         search,setSearch,showSearch,setShowSearch,
//         cartItems, setCartItems,addToCart,
//         getCartCount, updateQuantity,
//         getCartAmount, navigate, backendUrl,
//         setToken, token

//     }

//     return (
//         <ShopContext.Provider value={value}>
//             {props.children}

//         </ShopContext.Provider>

//     )
// }

// export default ShopContextProvider;

import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₱';
    const delivery_fee = 45;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // Add item to the cart
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // Get the total number of items in the cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    };

    // Update item quantity in the cart
    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // Calculate the total amount of items in the cart
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.price * cartItems[items];
            }
        }
        return totalAmount;
    };

    // Fetch product data
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Fetch user-specific cart data
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Handle login and store token
    const login = async (credentials) => {
        try {
            const response = await axios.post(backendUrl + '/api/login', credentials);
            if (response.data.success) {
                const { token } = response.data;
                setToken(token);
                localStorage.setItem('token', token);
                getUserCart(token);
                toast.success('Login successful');
                navigate('/profile');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // Check for token in localStorage on initial load
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, [token]);

    // Fetch product data on initial load
    useEffect(() => {
        getProductsData();
    }, []);

    // Provide context values
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl, setToken, token, login
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
