import { useState } from "react";
import Error from "./Error";

function SaleForm({ onAddSalesPost, setShowSaleForm }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/sales_posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                book_title: title,
                author,
                price,
                description
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((newSalesPost) => onAddSalesPost(newSalesPost))
                setTitle("")
                setAuthor("")
                setPrice("")
                setDescription("")
                setShowSaleForm(false)
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <div className="mt-4">
            <h2>Submit New Sale</h2>
            <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
                <div className="form-group gap-2">
                    <div className="col-auto">
                        <label htmlFor="title">Book Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control mb-1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            className="form-control mb-1"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            className="form-control mb-1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            rows="5"
                            className="form-control mb-1"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default SaleForm