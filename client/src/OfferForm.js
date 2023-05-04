import { useState } from "react"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Error from "./Error"

function OfferForm({ sale, setShowForm }) {
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/conversations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                recipient_id: sale.user.id,
                sales_post_id: sale.id,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => console.log(data))
                setContent("")
                setShowForm(false)
                history.push("/inbox");
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <div className="text-left">
            <div className="mt-4">
                <h2>Offer</h2>
                <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
                    <div className="form-group gap-2">
                        <div className="col-auto">
                            <label htmlFor="content">Message</label>
                            <textarea
                                type="text"
                                id="content"
                                rows="5"
                                className="form-control mb-1"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <input className="btn btn-outline-dark mt-2" type="submit" value="Submit" />
                    </div>
                    {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                    ))}
                </form>
            </div>
            <Button variant="outline-danger my-2" onClick={() => setShowForm(false)}>Cancel</Button>
        </div>
    )
}

export default OfferForm