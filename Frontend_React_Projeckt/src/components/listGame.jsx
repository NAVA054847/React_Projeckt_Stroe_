


import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onloadgame, update_game, dellgame } from "../redex/Action";
import { getAll, updateGame, dellthegame } from "../axios/gameaxios";

export const ListGame = () => {
    const dispatch = useDispatch();
    let listG = useSelector((x) => x.datagamereducer.listGame);

    const [isedit, setisedit] = useState(false);
    const [keyedit, setkeyedit] = useState(null);
    const [saveedit, setsaveedit] = useState(false);
    const [item, setitem] = useState({});
    const [flagedit, setflagedit] = useState(true);

    useEffect(() => {
        if (!listG || listG.length === 0) {
            getAll()
                .then((x) => dispatch(onloadgame(x.data)))
                .catch((err) => console.log(err));
        }
    }, []);

    const save = () => {
        setsaveedit(false);
        updateGame(item)
            .then(() => {
                dispatch(update_game(item));
                setisedit(false);
                setflagedit(true);
            })
            .catch((err) => console.log(err));
    };

    const todell = (id) => {
        dellthegame(id)
            .then(() => dispatch(dellgame(id)))
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            {/* <h2 className="text-center mb-4">רשימת משחקים</h2> */}
            {/* <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>קוד</th>
                        <th>שם</th>
                        <th>קטגוריה</th>
                        <th>מחיר</th>
                        <th>גיל</th>
                        <th>תמונה</th>
                        <th>כמות</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {listG.map((x, i) => (
                        <tr key={i}>
                            <td>{x._id}</td>
                            {isedit && keyedit === i ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={x.name}
                                            onBlur={(e) => setitem({ ...item, _id: x._id, name: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={x.code_category}
                                            onBlur={(e) => setitem({ ...item, code_category: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            defaultValue={x.price}
                                            onBlur={(e) => setitem({ ...item, price: parseFloat(e.target.value) })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            defaultValue={x.age}
                                            onBlur={(e) => setitem({ ...item, age: parseInt(e.target.value) })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={x.pic}
                                            onBlur={(e) => setitem({ ...item, pic: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            defaultValue={x.amount}
                                            onBlur={(e) => setitem({ ...item, amount: parseInt(e.target.value) })}
                                        />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{x.name}</td>
                                    <td>{x.code_category}</td>
                                    <td>{x.price}</td>
                                    <td>{x.age}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:8080/${x.pic}`}
                                            alt={x.name}
                                            className="img-thumbnail"
                                            style={{ width: "80px", height: "80px" }}
                                        />
                                    </td>
                                    <td>{x.amount}</td>
                                </>
                            )}
                            <td>
                                <div className="d-flex">
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => todell(x._id)}
                                    >
                                        מחק
                                    </button>
                                    {flagedit ? (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                setisedit(true);
                                                setkeyedit(i);
                                                setsaveedit(true);
                                                setitem({ ...x });
                                                setflagedit(false);
                                            }}
                                        >
                                            ערוך
                                        </button>
                                    ) : (
                                        saveedit &&
                                        keyedit === i && (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={save}
                                            >
                                                שמור שינויים
                                            </button>
                                        )
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
          <table className="table table-striped table-hover">
    <thead className="table-primary">
        <tr className="align-middle" style={{ height: "60px" }}>
            <th>קוד</th>
            <th>שם</th>
            <th>קטגוריה</th>
            <th>מחיר</th>
            <th>גיל</th>
            <th>תמונה</th>
            <th>כמות</th>
            <th>פעולות</th>
        </tr>
    </thead>
    <tbody>
        {listG.map((x, i) => (
            <tr key={i} className="align-middle" style={{ height: "80px" }}>
                <td>{x._id}</td>
                {isedit && keyedit === i ? (
                    <>
                        <td>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                defaultValue={x.name}
                                onBlur={(e) => setitem({ ...item, _id: x._id, name: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                defaultValue={x.code_category}
                                onBlur={(e) => setitem({ ...item, code_category: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                defaultValue={x.price}
                                onBlur={(e) => setitem({ ...item, price: parseFloat(e.target.value) })}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                defaultValue={x.age}
                                onBlur={(e) => setitem({ ...item, age: parseInt(e.target.value) })}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                defaultValue={x.pic}
                                onBlur={(e) => setitem({ ...item, pic: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                defaultValue={x.amount}
                                onBlur={(e) => setitem({ ...item, amount: parseInt(e.target.value) })}
                            />
                        </td>
                    </>
                ) : (
                    <>
                        <td>{x.name}</td>
                        <td>{x.code_category}</td>
                        <td>{x.price}</td>
                        <td>{x.age}</td>
                        <td>
                            <img
                                src={`http://localhost:8080/${x.pic}`}
                                alt={x.name}
                                className="img-thumbnail"
                                style={{ width: "80px", height: "80px" }}
                            />
                        </td>
                        <td>{x.amount}</td>
                    </>
                )}
                <td>
                    <div className="d-flex">
                        <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => todell(x._id)}
                        >
                            מחק
                        </button>
                        {flagedit ? (
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                    setisedit(true);
                                    setkeyedit(i);
                                    setsaveedit(true);
                                    setitem({ ...x });
                                    setflagedit(false);
                                }}
                            >
                                ערוך
                            </button>
                        ) : (
                            saveedit &&
                            keyedit === i && (
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={save}
                                >
                                    שמור שינויים
                                </button>
                            )
                        )}
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
};