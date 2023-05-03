import { useState } from "react"
import SaleForm from "./SaleForm"
import Sale from "./Sale"


function SalesList({ salesPosts, onAddSalesPost, onUpdateSalesPost, onDeleteSalesPost }) {
    const [showSaleForm, setShowSaleForm] = useState(false)

    return (
        <>
            <h1>Hello from SalesList!</h1>
            {showSaleForm ? (
                <>
                    <SaleForm onAddSalesPost={onAddSalesPost} setShowSaleForm={setShowSaleForm} />
                    <button
                        onClick={() => setShowSaleForm(false)}
                        className="text-center btn btn-outline-danger my-1"
                    >
                        Close
                    </button>
                </>
            ) : (
                <button
                    onClick={() => setShowSaleForm(true)}
                    className="text-center btn btn-outline-danger my-1"
                >
                    Submit New Sale
                </button>
            )}
            {salesPosts.slice(0).reverse().map((sale) => (
                <Sale
                    key={sale.id}
                    id={sale.id}
                    title={sale.book_title}
                    author={sale.author}
                    price={sale.price}
                    description={sale.description}
                    saleUser={sale.user}
                    onUpdateSalesPost={onUpdateSalesPost}
                    onDeleteSalesPost={onDeleteSalesPost}
                />
            ))}
        </>
    )
}

export default SalesList