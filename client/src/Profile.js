import { useState, useEffect, useContext, memo } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "./context/user"
import { useParams } from "react-router-dom"
import UpdateBioForm from "./UpdateBioForm"
import UpdatePhotoForm from "./UpdatePhotoForm"

const Profile = memo(() => {
    const [profileUser, setProfileUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        console.log("Fetching profile user data...");
        fetch(`/users/${id}`)
            .then((r) => r.json())
            .then((data) => {
                console.log("Received profile user data:", data);
                setProfileUser(data);
            });
    }, [id]);

    useEffect(() => {
        console.log("profileUser state:", profileUser);
    }, [profileUser]);

    return (
        <div>
            {profileUser ? (
                <div>
                    {profileUser.id === user.id ? (
                        <div>
                            <h1>Welcome, {profileUser.username}</h1>
                            {profileUser.image_url ? (
                                <img src={profileUser.image_url} alt={profileUser.username} />
                            ) : (
                                <div></div>
                            )}
                            <p>{profileUser.bio}</p>
                            <Button variant="outline-dark" onClick={() => setIsEditing((isEditing) => !isEditing)}>
                                {isEditing ? ("Cancel Edit") : ("Edit Profile")}
                            </Button>
                            {isEditing ? (
                                <div>
                                    <UpdateBioForm
                                        setIsEditing={setIsEditing}
                                        setProfileUser={setProfileUser}
                                        profileUser={profileUser}
                                        id={id}
                                    />
                                    <UpdatePhotoForm
                                        setIsEditing={setIsEditing}
                                        setProfileUser={setProfileUser}
                                        id={id}
                                    />
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h1>{profileUser.username}</h1>
                            <img src={profileUser.image_url} alt={profileUser.username} />
                            <p>{profileUser.bio}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    )
});

export default Profile