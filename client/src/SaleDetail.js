import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "./context/user"
import OfferForm from "./OfferForm"

function SaleDetail() {
    const [sale, setSale] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const { id } = useParams()
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetch(`/sales_posts/${id}`)
            .then(r => r.json())
            .then(data => setSale(data))
    }, [id])


    return (
        <>
            {sale ? (
                <>
                    <h1>{sale.book_title}</h1>
                    <img src={sale.image_url} alt={sale.book_title} />
                    <p>By {sale.author}</p>
                    <p>${sale.price}</p>
                    <p>{sale.description}</p>
                    <Link to={`/profile/${sale.user.id}`}>Seller: {sale.user.username}</Link>
                    <div>
                        {user && user.id !== sale.user.id && <button onClick={() => setShowForm(!showForm)}>Make an Offer</button>}
                    </div>
                    <div>
                        {showForm && <OfferForm sale={sale} setShowForm={setShowForm} />}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default SaleDetail