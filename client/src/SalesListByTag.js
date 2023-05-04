import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

function SalesListByTag() {
    const [tag, setTag] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch(`/tag/${id}/`)
            .then(r => r.json())
            .then(data => {
                setTag(data)
            })
    }, [id])

    return (
        <>
            {tag ? (
                <div>
                    <h1>Sales Posts with Tag: {tag.name}</h1>
                    {tag.sales_posts.map((sale) => (
                        <div key={sale.id}>
                            <Link to={`/sales/${sale.id}`}>
                                <h2>{sale.book_title}</h2>
                            </Link>
                            <p>{sale.author}</p>
                            <p>${sale.price}</p>
                            <p>{sale.description}</p>
                            {/* <Link to={`/profile/${sale.user.id}`}>Seller: {sale.user.username}</Link> */}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default SalesListByTag