import { useState } from "react";
import Error from "./Error";

function EditSalePhotoForm({ onUpdateSalesPost, id }) {
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        fetch(`/sales_posts/${id}`, {
            method: "PATCH",
            body: formData,
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedSalesPost) => onUpdateSalesPost(updatedSalesPost));
                setImage(null);
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    function handleImageChange(e) {
        setImage(e.target.files[0]);
    }

    return (
        <div className="mt-4">
            <h4>Change Image</h4>
            <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
                <div className="form-group gap-2">
                    <div className="col-auto">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            className="form-control mb-1"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <input className="btn btn-outline-dark my-2" type="submit" value="Submit" />
                </div>
                {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                ))}
            </form>
        </div>
    );
}

export default EditSalePhotoForm