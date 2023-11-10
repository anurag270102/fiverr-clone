import { useLocation, useNavigate } from 'react-router-dom';
import './success.scss'
import { useEffect } from 'react';
import newRequest from '../../utils/newRequest';
const Success = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const payment_intent = params.get('payment_intent');
    useEffect(() => {
        const makeRequest = async () => {
            try {
                await newRequest.put('/orders', { payment_intent });
                setTimeout(() => {
                    navigate("orders");
                }, 5000);
            } catch (error) {
                console.log(error);
            }
        }
        makeRequest();
    }, []);
    return (
       [  <div className="cm">
      <img src="images/successfully-done.gif" alt="" />
       </div>,
       <div className='success'>
            payment successfulYou are being redirected to the order page.<br></br>
        </div>,
         <span className='close'>please do not close page</span>]
    );
}
export default Success;