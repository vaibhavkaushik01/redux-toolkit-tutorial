import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";
import { removeItem,increase,decrease } from "../features/cart/cart";

const CartItem = (props)=>{
    const dispatch = useDispatch();
    return(
        <article className="cart-item">
            <img src={props.img} alt={props.title}/>
            <div>
                <h4>{props.title}</h4>
                <h4 className="item-price">${props.price}</h4>
                <button className="remove-btn" onClick={()=>{
                    dispatch(removeItem(props.id));
                }}>remove</button>
            </div>
            <div>
                <button className="amount-btn" onClick={()=>{
                    dispatch(increase(props.id));
                }}>
                    <ChevronUp/>
                </button>
                <p className="amount">{props.amount}</p>
                <button className="amount-btn" onClick={()=>{
                    if(props.amount===1){
                        dispatch(removeItem(props.id));
                    }else{
                        dispatch(decrease(props.id));
                    }
                }}>
                    <ChevronDown/>
                </button>
            </div>
        </article>
    );
}
export default CartItem;