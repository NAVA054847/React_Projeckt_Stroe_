import { useState } from "react"
import { useDispatch } from "react-redux";
import { addcust } from "../redex/Action";
import { addcustomer, getbynameandpass } from "../axios/custaxios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [newcust, setnwcust] = useState({});
    const dispach = useDispatch();
    const nevigate = useNavigate();


    const [myexeption1, setmyexeption1] = useState({ name: true })

    const checknumber = (e) => {
        let creditcardnumber = e.target.value
        let notvalid = !/^\d{16}$/.test(creditcardnumber);

        if (creditcardnumber == "")
            setmyexeption1({ ...myexeption1, name: "שדה חובה" })
        else if (notvalid)
            setmyexeption1({ ...myexeption1, name: "מספר אשראי צריך להכיל 16 ספרות בדיוק" })
        else
            setmyexeption1({ ...myexeption1, name: true })
    }


    const [myexeption2, setmyexeption2] = useState({ name: true })

    const datecard = (input) => {
        const date=input.target.value
        const today = new Date(); // תאריך נוכחי
        const currentMonth = today.getMonth() + 1; // חודשים ב-JS מתחילים מ-0
        const currentYear = today.getFullYear() % 100; // 2 ספרות של השנה הנוכחית
    
        const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/; // תבנית MM/YY
        const match = date.match(regex);
        let year;
        let month;
        
         if(match!=null){
         month = parseInt(match[1], 10); // המרת חודש למספר
         year = parseInt(match[2], 10); // המרת שנה למספר
    }
    
    
        if (date == "")
            setmyexeption2({ ...myexeption2, name: "שדה חובה" })
      else  if (match==null) 
            setmyexeption2({ ...myexeption2, name: "תאריך לא תקין. הפורמט צריך להיות MM/YY." })
      else  if (match!=null&&(year < currentYear || (year === currentYear && month <= currentMonth))) 
            setmyexeption2({ ...myexeption2, name: "התאריך צריך להיות מתאריך נוכחי ומעלה.." })
        else
        setmyexeption2({ ...myexeption2, name: true })
    
    };

    const [myexeption3, setmyexeption3] = useState({ name: true })

    const threenumber = (e) => {
        let numbers = e.target.value
        let notvalid = !/^\d{3}$/.test(numbers);

        if (numbers == "")
            setmyexeption3({ ...myexeption3, name: "שדה חובה" })
        else if (notvalid)
            setmyexeption3({ ...myexeption3, name: "חייב להכיל 3 ספות בדיוק" })
        else
            setmyexeption3({ ...myexeption3, name: true })
    }







    const addc = async () => {
        const response = await getbynameandpass(newcust.name, newcust.password);

        // אם המשתמש קיים במערכת
        if (response.data.name != null && response.data.password != null) {
            alert("אתה כבר קיים במערכת, התחבר");
            nevigate('/mylogin');
            return; // חוזר ומפסיק את המשך הפעולה
        }

        // אם המשתמש לא קיים במערכת, מוסיפים אותו
        try {
            await addcustomer(newcust); // מחכים עד שהמשתמש יתוסף
            dispach(addcust(newcust)); // מעדכנים את הסטור של הרדוקס
            alert("נרשמת בהצלחה, התחבר");
            nevigate('/mylogin');
        } catch (err) {
            console.log(err); // במקרה של שגיאה בהוספת המשתמש
        }
    };


    const navigateToLogin = () => {
        nevigate('/mylogin');
    };


    return <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
            <h2 className="text-center mb-4 text-primary">טופס הרשמה</h2>
            <form onSubmit={(e) => { e.preventDefault(); addc(); }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">שם</label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        placeholder="הכנס את שמך"
                        onBlur={(x) => setnwcust({ ...newcust, name: x.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">סיסמה</label>
                    <input
                        id="password"
                        className="form-control"
                        type="password"
                        placeholder="הכנס סיסמה"
                        onBlur={(x) => setnwcust({ ...newcust, password: x.target.value })}
                        required
                    />
                </div>
                <h3 className="text-center text-secondary">פרטי אשראי</h3>
                <div className="mb-3">
                    <label htmlFor="creditCardNumber" className="form-label">מספר אשראי</label>
                    <input
                        id="creditCardNumber"
                        className="form-control"
                        type="text"
                        placeholder="הכנס מספר אשראי"
                        onBlur={(x) => {x.preventDefault();checknumber(x);setnwcust({ ...newcust, creditCard: { ...newcust.creditCard, number: x.target.value } })}}
                        required
                    />
                      
                </div>
                {myexeption1.name != true && <p className="alert alert-danger">{myexeption1.name}</p>}
                <div className="mb-3">
                    <label htmlFor="expiryDate" className="form-label">תוקף</label>
                    <input
                        id="expiryDate"
                        className="form-control"
                        type="text"
                        placeholder="תאריך תוקף (MM/YY)"
                        onBlur={(x) => {x.preventDefault();datecard(x);setnwcust({ ...newcust, creditCard: { ...newcust.creditCard, lastDate: x.target.value } })}}
                        required
                    />
                </div>
                {myexeption2.name != true && <p className="alert alert-danger">{myexeption2.name}</p>}
                <div className="mb-3">
                    <label htmlFor="cvv" className="form-label">3 ספרות</label>
                    <input
                        id="cvv"
                        className="form-control"
                        type="text"
                        placeholder="CVV"
                        onBlur={(x) =>{x.preventDefault();threenumber(x); setnwcust({ ...newcust, creditCard: { ...newcust.creditCard, cvv: x.target.value } })}}
                        required
                    />
                </div>
                {myexeption3.name != true && <p className="alert alert-danger">{myexeption3.name}</p>}
                <div className="d-grid">
                    <button className="btn btn-primary" type="submit">הרשמה</button>
                </div>
            </form>
            {/* <div className="text-center mt-3">
            <p>כבר רשום? <a href="/mylogin" className="text-decoration-none">התחבר כאן</a></p>
        </div> */}
            <div className="text-center mt-3">
                <button className="btn btn-link text-decoration-none" onClick={navigateToLogin}>כבר רשום? התחבר כאן</button>
            </div>
        </div>
    </div>


    {/* 
        <div>
            <form>
                <input placeholder="שם" type="text" onBlur={(x) => setnwcust({ ...newcust, name: x.target.value })}></input>
                <input placeholder="סיסמה" type="password" onBlur={(x) => setnwcust({ ...newcust, password: x.target.value })}></input>
                <h3>פרטי אשראי</h3>
                <input placeholder="מספר אשראי" type="text" onBlur={(x) => setnwcust({ ...newcust, creditCard: { ...newcust.creditCard, number: x.target.value } })} />

                <input placeholder=" תוקף" type="text" onBlur={(x) => setnwcust({ ...newcust, creditCard: { ...newcust.creditCard, lastDate: x.target.value } })} />

                <input placeholder=" 3 ספרות" type="text" onBlur={(x) => setnwcust({ ...newcust, creditCard: { ...newcust.creditCard, cvv: x.target.value } })} />

                <button onClick={(x) => { x.preventDefault(); addc(); }}>הרשמה</button>
            </form>
        </div> */}








}