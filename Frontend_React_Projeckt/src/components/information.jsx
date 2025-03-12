
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { additemtocart } from "../redex/Action";

export const Information = () => {
    const params = useParams();
    const listG = useSelector((x) => x.datagamereducer.listGame);
    const obj = listG.find((x) => x._id == params.id);
    const dispach = useDispatch();
    const nevigate = useNavigate();

    return (
        <div className="container mt-5" dir="rtl">
            <h2 className="text-center mb-4">{obj.name}</h2>
            <div className="card mx-auto shadow-lg" style={{ maxWidth: "800px" }}>
                <img
                    src={`http://localhost:8080/${obj.pic}`}
                    className="card-img-top"
                    alt={`תמונה של ${obj.name}`}
                />
                <div className="card-body text-center">
                    <h3 className="card-title mb-3">{obj.name}</h3>
                    <div className="text-end">
                        <p><strong>קוד משחק:</strong> {obj._id}</p>
                        <p><strong>מחיר משחק:</strong> ₪{obj.price}</p>
                        <p><strong>טווח גילאים:</strong> {obj.age}</p>
                        <p><strong>קוד קטגוריה:</strong> {obj.code_category}</p>
                        <p><strong>כמות במלאי:</strong> {obj.amount}</p>
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={(e) => {
                            e.preventDefault();
                            dispach(additemtocart(obj));
                            nevigate('/myhome');
                        }}
                    >
                        הוסף לסל הקניות
                    </button>
                </div>
            </div>
        </div>
    );
};