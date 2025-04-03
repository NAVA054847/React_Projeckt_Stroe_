import { useDispatch, useSelector } from "react-redux"
import { addshop, dellcategory, dellitem, editsumcartless, editsumcartmore } from "../redex/Action";
import { Link, useNavigate } from "react-router-dom";
import { addnewshop } from "../axios/shopaxios"
import { useState } from "react";

export const Cart = () => {
    const listcart = useSelector(x => x.datacartreducer.listcart)
    const dispach = useDispatch();
    const user = useSelector(x => x.datacustreducer.currentCustomer)
    const nevigate = useNavigate()
    const [newshop, setnewshop] = useState({})

    const f = () => {
        if (!user || !user.name) {
            alert("אינך מחובר, התחבר")
            nevigate("/mylogin")
        }
        else {
            const gamesArray = listcart.map((game) => ({
                codeGame: game._id,
                nameGame: game.name,
                price: game.price,
                amount: game.sum,
                totalprice: game.price * game.sum
            }));

            const totalSum = gamesArray.reduce((sum, game) => sum + game.totalprice, 0);

            const shopObject = {
                codeCustomer: user._id,
                date: TodayDate(),
                gameArr: gamesArray,
                sum: totalSum
            };

            return shopObject;
        }
    }

    const check = async () => {
        const obj = f(); // יצירת אובייקט הקנייה
        if (obj) {
            try {
                const response = await addnewshop(obj); // קריאה לאקסיוס
                dispach(addshop(response.data)); // עדכון הסטור
                if (!user || !user.name) {
                    alert("אינך מחובר- התחבר")
                    nevigate('/mylogin')
                }
                else
                    nevigate("/myendshop"); // ניווט לאחר הצלחה
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    const TodayDate = () => {
        const today = new Date(); // יוצרת אובייקט Date של התאריך הנוכחי
        const formattedDate = today.toLocaleDateString(); // הופכת את התאריך לפורמט קריא
        return (formattedDate);
    }

    return <>

    { listcart.length > 0 &&(   <h2>סל הקניות שלי</h2>)}

        {/* אם אין קניות בסל */}
        {listcart.length === 0 ? (
  <div className="container mt-5">
  <div className="alert alert-info d-flex align-items-center justify-content-between p-4 shadow-lg rounded-4" role="alert">
      <div className="d-flex align-items-center">
          <i className="bi bi-cart-x-fill me-3" style={{ fontSize: "1.5rem" }}></i>
          <div>
              <h4 className="alert-heading mb-2">אין לך קניות בסל!</h4>
              <p>נראה שאין פריטים בסל שלך. הוסף מוצרים לסל כדי להתחיל את הקנייה.</p>
          </div>
      </div>
      <div>
          <p className="mb-0">חזור ל<Link to="/myhome">דף הבית</Link></p>
      </div>
  </div>
</div>
        ) : (
            <table className="table container">
                <thead>
                    <tr>
                        <th>קוד</th>
                        <th>שם</th>
                        <th>מחיר</th>
                        <th>תמונה</th>
                        <th>גיל</th>
                        <th>קוד קטגוריה</th>
                        <th>כמות</th>
                        <th>אפשרויות נוספות</th>
                    </tr>
                </thead>

                <tbody>
                    {listcart.map((x, i) => (
                        <tr key={i}>
                            <td>{x._id}</td>
                            <td>{x.name}</td>
                            <td>{x.price}</td>
                            <td>
                                <img src={`http://localhost:8080/${x.pic}`} alt={x.name} style={{ width: "80px", height: "80px" }} />
                            </td>
                            <td>{x.age}</td>
                            <td>{x.code_category}</td>
                            <td>
                                <button onClick={(e) => { e.preventDefault(); dispach(editsumcartmore(x._id)) }}>+</button>
                                {x.sum}
                                <button onClick={(e) => { e.preventDefault(); dispach(editsumcartless(x._id)) }}>-</button>
                            </td>
                            <td>
                                <button onClick={(e) => { e.preventDefault(); dispach(dellitem(x._id)) }} >מחק</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

   {listcart.length > 0 && (
        <button onClick={() => { check(); }}>סיום הקניה</button>
    )}
    </>
}