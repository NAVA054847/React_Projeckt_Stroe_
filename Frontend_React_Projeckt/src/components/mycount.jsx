// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"
// import { getshopsbycust } from "../redex/Action"
// import { getshopbyidcust } from "../axios/shopaxios"



// export const Mycount = () => {
//     const user = useSelector(x => x.datacustreducer.currentCustomer)
//     const nevigate = useNavigate()
//     const listshopuser = useSelector(x => x.datashopreducer.listshop)
//     const dispach = useDispatch()
//     const [flag,setflag]=useState(true)

// debugger
//     // useEffect(() => {

//     //     if (user && (listshopuser == null || listshopuser.length == 0)) {
//     //         getshopbyidcust(user.codeCustomer).then((x) => 
              
//     //             dispach(getshopsbycust(x))
           
//     //         )
//     //             .catch((err) => console.log(err))
//     //     }
     
//     // }, [])

//     useEffect(() => {
      
//         if (user && (listshopuser == null || listshopuser.length === 0)) {
//             // alert(user._id)
//             setflag(true)
//             alert(`User exists: ${user ? 'Yes+' : 'No'}`);
//             alert(user.name)
//             alert(`CodeCustomer: ${user._id || 'Undefined'}`);
           
//             getshopbyidcust(user._id)
//                 .then((x) => {
//                     alert(`Data received from server: ${JSON.stringify(x.data)}`);
//                     dispach(getshopsbycust(x.data));
//                     setflag(false)
//                 })
//                 .catch((err) => alert(`Error fetching data: ${err.message}`));
//         } else {
//             alert(`No user or listshopuser is already populated.`);
//             setflag(false)
//         }
//     },[] );
    

//     // alert(listshopuser[0]._id+":"+listshopuser[0].date)

//     if (flag) {
//         return <p>טוען נתונים...</p>; // הצגת טעינה
//     }




//     return <>

//         {!user && (
//             <div className="d-flex justify-content-center">
//                 <div className="card text-center shadow" style={{ maxWidth: "400px" }}>
//                     <div className="card-body">
//                         <h5 className="card-title text-danger">אינך מחובר</h5>
//                         <p className="card-text">
//                             עליך להתחבר על מנת לגשת לאזור האישי שלך.
//                         </p>
//                         <Link to={"/mylogin"} className="btn btn-primary">
//                             התחבר כאן
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         )}

//         {user && (

//             <table>
//                 <thead>
//                     <tr>

//                         <th>קוד קניה</th>
//                         <th>תאריך</th>
//                         <th>סכום הקניה</th>
//                         <th>אפשרויות נוספות </th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {listshopuser.map((x, i) => <tr key={i}>
//                         <td>{x._id}</td>
//                         <td>{x.date}</td>
//                         <td>{x.sum}</td>
//                         <td><button >פרטים נוספים</button></td>

//                     </tr>)}

//                 </tbody>

//             </table>
//         )}

//         {user && listshopuser && listshopuser.length === 0 && <p>אין רכישות להצגה</p>}



//     </>


// }






import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getshopsbycust } from "../redex/Action";
import { getshopbyidcust } from "../axios/shopaxios";

export const Mycount = () => {
  const user = useSelector((x) => x.datacustreducer.currentCustomer);
  const nevigate = useNavigate();
  const listshopuser = useSelector((x) => x.datashopreducer.listshop);
  const dispach = useDispatch();
  const [flag, setflag] = useState(true);


  useEffect(() => {
    if (user && (listshopuser == null || listshopuser.length === 0)) {
      setflag(true);
      getshopbyidcust(user._id)
        .then((x) => {
          dispach(getshopsbycust(x.data));
          setflag(false);
        })
        .catch((err) => alert(`Error fetching data: ${err.message}`));
    } else {
    //   alert(`No user or listshopuser is already populated.`);
      setflag(false);
    }
  }, []);

  if (flag) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">טוען נתונים...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {!user && (
        <div className="d-flex justify-content-center">
          <div className="card text-center shadow" style={{ maxWidth: "400px" }}>
            <div className="card-body">
              <h5 className="card-title text-danger">אינך מחובר</h5>
              <p className="card-text">
                עליך להתחבר על מנת לגשת לאזור האישי שלך.
              </p>
              <Link to={"/mylogin"} className="btn btn-primary">
                התחבר כאן
              </Link>
            </div>
          </div>
        </div>
      )}

      {user && (
        <div className="container mt-5">
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>קוד קניה</th>
                  <th>תאריך</th>
                  <th>סכום הקניה</th>
                  <th>אפשרויות נוספות</th>
                </tr>
              </thead>
              <tbody>
                {listshopuser.map((x, i) => (
                  <tr key={i}>
                    <td>{x._id}</td>
                    <td>{x.date}</td>
                    <td>{x.sum}</td>
                    <td>
                      <button className="btn btn-info btn-sm" onClick={()=>nevigate(`../mydetailshop/${x._id}`)}>
                        פרטים נוספים
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {user && listshopuser && listshopuser.length === 0 && (
        <p className="text-center mt-4">אין רכישות להצגה</p>
      )}
    </>
  );
};