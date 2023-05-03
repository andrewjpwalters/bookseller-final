import { useState } from "react";
import Error from "./Error";

function UpdateProfileForm({ setIsEditing, setProfileUser, id }) {
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("image", image);

        fetch(`/profile/${id}`, {
            method: "PATCH",
            body: formData,
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedUser) => setProfileUser(updatedUser));
                setBio("");
                setImage(null);
                setIsEditing(false);
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
            <h2>Add or Edit Image and Bio</h2>
            <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
                <div className="form-group gap-2">
                    <div className="col-auto">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            rows="5"
                            className="form-control mb-1"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
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
                    <input className="btn btn-outline-dark mt-2" type="submit" value="Submit" />
                </div>
                {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                ))}
            </form>
        </div>
    );
}

export default UpdateProfileForm