import { useState } from "react";
import Error from "./Error";

function NewMessageForm({ conversation, onAddMessage }) {
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`conversations/${conversation.id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((newMessage) => {
                    console.log(newMessage);
                    setContent("");
                    setErrors([]);
                    onAddMessage(newMessage);
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
                <div className="form-group gap-2">
                    <div className="col-auto">
                        <label htmlFor="content">Reply:</label>
                        <input
                            type="text"
                            id="content"
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
    )
}

export default NewMessageForm;