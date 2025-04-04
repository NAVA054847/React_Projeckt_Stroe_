import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGbyCategoryId, onloadgame } from "../redex/Action";
import { getAll, getgamebycategoryid } from "../axios/gameaxios";
import { useEffect, useState } from "react";

export const Home = () => {
    const listG = useSelector((x) => x.datagamereducer.listGame);
    const navigate = useNavigate();
    const currentU = useSelector((x) => x.datacartreducer.currentuser);
    const [hasFetched, setHasFetched] = useState(false);
    const dispatch = useDispatch();
    const [lookforcategory, setlookforcategory] = useState("");

    useEffect(() => {
        if (!currentU?.name && !hasFetched) {
            getAll()
                .then((response) => {
                    dispatch(onloadgame(response.data));
                    setHasFetched(true);
                })
                .catch((err) => console.log(err));
        }
    }, [currentU, hasFetched, dispatch]);

    const filter = (id) => {
        getgamebycategoryid(id)
            .then((x) => {
                dispatch(getGbyCategoryId(x.data));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">🎮 חנות המשחקים המובילה</h1>

            {/* Search Section */}
            {/* <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="הכנס קוד קטגוריה"
                            onChange={(e) => setlookforcategory(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => filter(lookforcategory)}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                                alt="Search"
                                style={{ width: "18px", height: "18px" }}
                            />
                        </button>
                    </div>
                </div>
            </div> */}

            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control shadow-sm rounded-pill"
                            placeholder="הכנס קוד קטגוריה"
                            style={{
                                height: "45px",
                                textAlign: "center",
                            }}
                            onChange={(e) => setlookforcategory(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-primary rounded-pill ms-2"
                            style={{
                                height: "45px",
                                width: "45px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onClick={() => filter(lookforcategory)}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                                alt="Search"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Games Section */}

<div className="row g-4">
    {listG.map((game) => (
        <div className="col-lg-3 col-md-4 col-sm-6" key={game.id}>
            <div
                className="card h-100 text-center shadow-sm border rounded-3"
                style={{
                    backgroundColor: "#f8f9fa",
                    borderColor: "#dee2e6",
                }}
            >
                <img
                    src={`http://localhost:8080/${game.pic}`}
                    className="card-img-top p-3"
                    alt={game.name}
                    style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        margin: "auto",
                    }}
                />
                <div className="card-body">
                    <h5
                        className="card-title text-truncate text-dark fw-bold fs-5 p-2 rounded"
                        style={{ transition: "all 0.3s ease" }}
                        onMouseEnter={(e) => e.target.classList.add('text-primary', 'bg-light')}
                        onMouseLeave={(e) => e.target.classList.remove('text-primary', 'bg-light')}
                    >
                        {game.name}
                    </h5>
                    <p className="card-text text-muted mb-2">
                        מחיר: {game.price} ₪
                    </p>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate(`../myinformation/${game._id}`)}
                    >
                        פרטים נוספים
                    </button>
                </div>
            </div>
        </div>
    ))}
</div>
        </div>
    );
};





//שם קטגוריה במקום קןד קטגוריה

