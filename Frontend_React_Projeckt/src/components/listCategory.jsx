import { useDispatch, useSelector } from "react-redux";
import { dellcategory, set_listCategory, update_category } from "../redex/Action";
import { useEffect, useState } from "react";
import { deletee, getAll, updateCategory } from "../axios/categoryaxios";

export const ListCategory = () => {
    const dispatch = useDispatch();
    let listC = useSelector((x) => x.datacategoryreducer.listCategory);

    const [isedit, setisedit] = useState(false);
    const [keyedit, setkeyedit] = useState(null);
    const [saveedit, setsaveedit] = useState(false);
    const [item, setitem] = useState({});
    const [flagedit, setflagedit] = useState(true);

    const saveitem = (x) => {
        setitem({ _id: x._id, name: x.name });
    };

    const save = () => {
        setsaveedit(false);
        updateCategory(item)
            .then(() => {
                dispatch(update_category(item));
                setisedit(false);
                setflagedit(true);
            })
            .catch((err) => console.log(err));
    };

    const dellitem = (id) => {
        deletee(id)
            .then(() => dispatch(dellcategory(id)))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (!listC || listC.length === 0) {
            getAll()
                .then((x) => dispatch(set_listCategory(x.data)))
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <div className="container mt-5">
            {/* <h2 className="text-center mb-4">רשימת קטגוריות</h2> */}
            <table className="table table-bordered table-striped table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>קוד</th>
                        <th>שם</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {listC.map((x, i) => (
                        <tr key={i}>
                            <td>{x._id}</td>
                            {isedit && keyedit === i ? (
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={x.name}
                                        onBlur={(e) => setitem({ ...item, name: e.target.value })}
                                    />
                                </td>
                            ) : (
                                <td>{x.name}</td>
                            )}
                            <td>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => dellitem(x._id)}
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
                                                saveitem(x);
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

































