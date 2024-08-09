import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useEffect } from "react";
import { calculateTotal, getElementsfromApi } from "./features/cart/cart";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal";

function App() {
  const {cartItems,isLoading} = useSelector((state)=>state.cart)
  const {isOpen} = useSelector((state)=>state.modal);

  useEffect(()=>{
    dispatch(getElementsfromApi());
  },[]);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(calculateTotal());
  },[cartItems])


  if(isLoading){
    return(
      <div className="loading">
          <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <>
      {isOpen && <Modal/>}
      <Navbar/>
      <CartContainer/>
    </>
  );
}
export default App;
