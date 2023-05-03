import { useState, useEffect, useContext } from "react"
import { UserContext } from "./context/user"
import { useParams } from "react-router-dom"
import UpdateProfileForm from "./UpdateProfileForm"

function Profile() {
    const [profileUser, setProfileUser] = useState(null)
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

                            <UpdateProfileForm />
                        </>
                    ) : (
                        <h1>{profileUser.username}</h1>
                    )}
                    <p>{user.bio}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>

    )
}

export default Profile