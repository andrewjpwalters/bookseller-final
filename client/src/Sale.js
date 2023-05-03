import { Card, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from './context/user';
import { Link } from 'react-router-dom';
import EditSaleForm from './EditSaleForm';
import Error from './Error';

function Sale({
    id,
    title,
    author,
    price,
    description,
    saleUser,
    onDeleteSalesPost,
    onUpdateSalesPost
}) {
    const { user } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [errors, setErrors] = useState([])

    function handleDeleteSalesPost() {
        fetch(`/sales_posts/${id}`, {
            method: "DELETE",
        })
            .then(r => {
                if (r.ok) {
                    onDeleteSalesPost(id)
                } else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
    }

    function handleUpdateSalesPost(updatedSalesPost) {
        setIsEditing(false);
        onUpdateSalesPost(updatedSalesPost)
    }

    return (
        <Card className="text-center my-2 p-2" style={{ width: '30rem' }}>
            {/* <Card.Img variant="top" src={img_url} alt={name} /> */}
            <Card.Body>
                <Card.Title className="my-3">{title}</Card.Title>
                <Card.Text>By {author}</Card.Text>
                <Card.Text>${price}</Card.Text>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Submitted by {saleUser.username}</Card.Text>
                {isEditing ? (
                    <EditSaleForm
                        id={id}
                        title={title}
                        author={author}
                        price={price}
                        description={description}
                        onUpdateSalesPost={handleUpdateSalesPost}
                    />
                ) : (
                    <>
                    </>
                )}
                {user.id === saleUser.id ? (
                    <>
                        <Button variant="outline-dark" onClick={() => setIsEditing((isEditing) => !isEditing)}>
                            {isEditing ? ("Cancel Edit") : ("Edit Sale")}
                        </Button>
                        <Button className="mx-2" variant="danger" onClick={handleDeleteSalesPost}>Delete Sale</Button>
                    </>
                ) : (
                    <></>
                )}
                <div>
                    <Link to={`/sales/${id}`} className="btn btn-outline-dark mt-2" >Details</Link>
                </div>
            </Card.Body>
            {errors || [].map((err) => (
                <Error key={err}>{err}</Error>
            ))}
        </Card>
    )
}

export default Sale