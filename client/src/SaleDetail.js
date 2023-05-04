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
                <div>
                    <div className="text-center">
                        <h1 className="display-2">{sale.book_title}</h1>
                        <img src={sale.image_url} alt={sale.book_title} />
                        <p>By {sale.author}</p>
                        <p>${sale.price}</p>
                        <p>{sale.description}</p>
                        <Link to={`/profile/${sale.user.id}`}>Seller: {sale.user.username}</Link>
                        <p>Tags:</p>
                        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                            {sale.tags.map((tag) => (
                                <li key={tag.id} style={{ display: "inline-block", marginRight: "0.5rem" }}>{tag.name}</li>
                            ))}
                        </ul>
                        <div>
                            {user && user.id !== sale.user.id && <button className="btn btn-outline-dark mt-2" onClick={() => setShowForm(!showForm)}>Make an Offer</button>}
                        </div>
                    </div>
                    <div>
                        {showForm && <OfferForm sale={sale} setShowForm={setShowForm} />}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default SaleDetail