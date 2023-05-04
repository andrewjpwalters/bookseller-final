import { useState } from "react";
import Error from "./Error";

function EditSaleForm({ id, title, author, price, description, onUpdateSalesPost }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newAuthor, setNewAuthor] = useState(author)
    const [newPrice, setNewPrice] = useState(price);
    const [newDescription, setNewDescription] = useState(description)
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/sales_posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                book_title: newTitle,
                author: newAuthor,
                price: newPrice,
                description: newDescription
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedSalesPost) => onUpdateSalesPost(updatedSalesPost))
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <>
            <h4>Change Details</h4>
            <div className="mt-4">
                <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
                    <div className="form-group gap-2">
                        <div className="col-auto">
                            <label htmlFor="title">Book Title</label>
                            <input
                                type="text"
                                id="title"
                                className="form-control mb-1"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                id="author"
                                className="form-control mb-1"
                                value={newAuthor}
                                onChange={(e) => setNewAuthor(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                id="price"
                                className="form-control mb-1"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="5"
                                className="form-control mb-1"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </div>
                        <input className="btn btn-outline-dark my-2" type="submit" value="Submit" />
                    </div>
                    {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                    ))}
                </form>
            </div>
        </>
    );
}

export default EditSaleForm