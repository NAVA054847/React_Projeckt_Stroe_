import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Endshop = () => {
    const newby = useSelector(x => x.datacartreducer.listcart)
    const current = useSelector(x => x.datacustreducer.currentCustomer)
    const nevigate=useNavigate()


    const TodayDate = () => {
        const today = new Date(); // יוצרת אובייקט Date של התאריך הנוכחי
        const formattedDate = today.toLocaleDateString(); // הופכת את התאריך לפורמט קריא
        return (formattedDate);
    }

    const totalsum = () => {
        let sum = 0;
        {
            newby.map((x, i) => <div key={i}>
                {sum = sum + ((x.price) * (x.sum))}
            </div>)
        }
        return (sum);
    }


    return <>
        <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-center bg-primary text-white">
          <h2>סיום קניה</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <h5>
              <strong>קוד לקוח:</strong> {current._id}
            </h5>
            <h5>
              <strong>תאריך:</strong> {TodayDate()}
            </h5>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>קוד משחק</th>
                  <th>שם המשחק</th>
                  <th>מחיר ליחידה</th>
                  <th>כמות</th>
                  <th>מחיר סופי</th>
                </tr>
              </thead>
              <tbody>


                {newby.map((x, i) => (
                  <tr key={i}>
                    <td>{x._id}</td>
                    <td>{x.name}</td>
                    <td>{x.price}</td>
                    <td>{x.sum}</td>
                    <td>{x.price * x.sum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-4">
            <h4>
              <strong>סכום הקניה:</strong> ₪{totalsum()}
            </h4>
          </div>
        </div>
        <div className="card-footer text-center bg-light">
          <p>תודה רבה על הרכישה!</p>
        </div>
      </div>
    </div>

       

    </>
}