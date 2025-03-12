import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { datacustreducer } from "../redex/reducer/datacustreducer";

export const Nav = () => {
    const currentu = useSelector(x => x.datacartreducer.currentuser);
    // const currentu=useSelector(x=>datacustreducer.currentCustomer);
   

    return <div>

        <ul class="nav nav-tabs">
        <li className="nav-item">
                <NavLink className="nav-link" to="mylogin">התחברות</NavLink>
            </li>
            {currentu.name == "מנהל" && currentu.pass=="111"&&<li className="nav-item"><NavLink className="nav-link" to="myListG">רשימת המשחקים</NavLink></li>}
            
            {currentu.name == "מנהל" && currentu.pass=="111"&&<li className="nav-item"><NavLink className="nav-link" to="myaddgame">הוספת משחק </NavLink></li>}

            {currentu.name == "מנהל" && currentu.pass=="111"&&<li className="nav-item"><NavLink className="nav-link" to="myListC">רשימת הקטגוריות</NavLink></li>}

            {currentu.name == "מנהל" && currentu.pass=="111"&&<li className="nav-item"><NavLink className="nav-link" to="myAddCategory">הוספת קטגוריה</NavLink></li>}

         

            <li className="nav-item">
                <NavLink className="nav-link" to="myhome">דף הבית</NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="mymycount"> אזור אישי</NavLink>
            </li>
         
            {/* <li className="nav-item">
                <NavLink className="nav-link" to="myregister">הרשמה </NavLink>
            </li> */}

            {currentu.name != "מנהל" && <li className="nav-item"><NavLink className="nav-link" to="mycart">צפיה בסל </NavLink> </li>}


        </ul>
    </div>
}