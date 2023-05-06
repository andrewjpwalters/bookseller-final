import { useState, useEffect } from "react";
import Error from "./Error";

function UpdateBioForm({ setIsEditing, profileUser, setProfileUser, id }) {
    const [bio, setBio] = useState(profileUser.bio);
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Updating bio...");

        const formData = new FormData();
        formData.append("bio", bio);

        fetch(`/users/${id}`, {
            method: "PATCH",
            body: formData,
        })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    throw new Error("Failed to update bio");
                }
            })
            .then((updatedUser) => {
                console.log("Updated user data:", updatedUser);
                setProfileUser(updatedUser);
                setBio("");
                setIsEditing(false);
            })
            .catch((error) => {
                console.log("Error updating bio:", error);
                setErrors([error.message]);
            });
    }

    useEffect(() => {
        console.log("bio state:", bio);
    }, [bio]);

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