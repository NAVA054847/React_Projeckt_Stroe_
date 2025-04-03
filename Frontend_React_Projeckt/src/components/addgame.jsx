import { useDispatch } from "react-redux";
import { addgame } from "../redex/Action";
import { useState } from "react";
import { addgamee } from "../axios/gameaxios";

export const Addgame = () => {
    const dispatch = useDispatch();
    const [newg, setNewg] = useState({});

    const addNewGame = () => {
        addgamee(newg)
            .then((x) => {
                dispatch(addgame(x.data));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container my-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: "400px" }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">הוספת משחק</h2>
                    <form>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="שם משחק"
                                onBlur={(e) =>
                                    setNewg({ ...newg, name: e.target.value })
                                }
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="קוד קטגוריה"
                                onBlur={(e) =>
                                    setNewg({ ...newg, code_category: e.target.value })
                                }
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                placeholder="מחיר"
                                onBlur={(e) =>
                                    setNewg({ ...newg, price: e.target.value })
                                }
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                placeholder="גיל"
                                onBlur={(e) =>
                                    setNewg({ ...newg, age: e.target.value })
                                }
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="ניתוב תמונה"
                                onBlur={(e) =>
                                    setNewg({ ...newg, pic: e.target.value })
                                }
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                placeholder="כמות המלאי"
                                onBlur={(e) =>
                                    setNewg({ ...newg, amount: e.target.value })
                                }
                                className="form-control"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addNewGame();
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