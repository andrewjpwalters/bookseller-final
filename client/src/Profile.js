import { useState, useEffect, useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "./context/user"
import { useParams } from "react-router-dom"
import UpdateBioForm from "./UpdateBioForm"
import UpdatePhotoForm from "./UpdatePhotoForm"

function Profile() {
    const [profileUser, setProfileUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const { user } = useContext(UserContext)
    const { id } = useParams()


    useEffect(() => {
        fetch(`/users/${id}`)
            .then(r => r.json())
            .then(data => setProfileUser(data))
    }, [id])

    return (
        <>
            {profileUser ? (
                <>
                    {profileUser.id === user.id ? (
                        <>
                            <h1>Welcome, {profileUser.username}</h1>
                            {user.image_url ? (
                                <img src={user.image_url} alt={user.username} />
                            ) : (
                                <></>
                            )}
                            <p>{user.bio}</p>
                            <Button variant="outline-dark" onClick={() => setIsEditing((isEditing) => !isEditing)}>
                                {isEditing ? ("Cancel Edit") : ("Edit Profile")}
                            </Button>
                            {isEditing ? (
                                <>
                                    <UpdateBioForm
                                        setIsEditing={setIsEditing}
                                        setProfileUser={setProfileUser}
                                        id={id}
                                    />
                                    <UpdatePhotoForm
                                        setIsEditing={setIsEditing}
                                        setProfileUser={setProfileUser}
                                        id={id}
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <>
                            <h1>{profileUser.username}</h1>
                            <img src={profileUser.image_url} alt={profileUser.username} />
                            <p>{profileUser.bio}</p>
                        </>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>

    )
}

export default Profile