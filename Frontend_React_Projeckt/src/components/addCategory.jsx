import { useState } from "react";
import { useDispatch } from "react-redux";
import { add_Category } from "../redex/Action";
import { add } from "../axios/categoryaxios";

export const AddCategory = () => {
    const dispatch = useDispatch();
    const [newC, setNewC] = useState({});
    const [myException, setMyException] = useState({ name: true });

    const addItem = () => {
        add(newC)
            .then((x) => dispatch(add_Category(x.data)))
            .catch((err) => console.log(err));
    };

    const checkName = (e) => {
        let nameC = e.target.value;
        let notValid = !nameC.match("[^.][א-ת]{1}"); // בדיקה אם השם חוקי
        if (nameC === "") {
            setMyException({ ...myException, name: "שדה חובה" });
        } else if (notValid) {
            setMyException({
                ...myException,
                name: "שם קטגוריה מכילה אותיות בעברית בלבד",
            });
        } else {
            setMyException({ ...myException, name: true });
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: "400px" }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">הוספת קטגוריה</h2>
                    <form>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="הכנס שם קטגוריה"
                                onBlur={(e) => {
                                    checkName(e);
                                    setNewC({ ...newC, name: e.target.value });
                                }}
                                className="form-control"
                            />
                            {myException.name !== true && (
                                <div className="alert alert-danger mt-2">
                                    {myException.name}
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addItem();
                                }}
                                className="btn btn-primary w-100"
                            >
                                הוסף
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};