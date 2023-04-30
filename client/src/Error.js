function Error({ children }) {
    return (
        <>
            <p className="text-danger fw-bold">ERROR</p>
            <p className="text-danger fw-bold">{children}</p>
        </>
    );
}

export default Error