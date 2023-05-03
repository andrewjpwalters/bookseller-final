import { useState } from "react";
import Error from "./Error";

function UpdateBioForm({ setIsEditing, setProfileUser, id }) {
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bio", bio);
        fetch(`/profile/${id}`, {
            method: "PATCH",
            body: formData,
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedUser) => setProfileUser(updatedUser));
                setBio("");
                setIsEditing(false);
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <div className="mt-4">
            <h4>Add or Edit Bio</h4>
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
                    <input className="btn btn-outline-dark mt-2" type="submit" value="Submit" />
                </div>
                {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                ))}
            </form>
        </div>
    );
}

export default UpdateBioForm