
const App = () => {
    const [pro, setPro] = React.useState([]);
    const [form, setForm] = React.useState({
        name: '', 
        price: ''
    });

    React.useEffect(() => {
        fetchProducts()
    }, []);
    const fetchProducts = () => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setPro(data))
            .catch(err => console.error("Error fetching products:", err));     
    }
    const handleSubmit = (event) => {
            event.preventDefault()
           if(!form.name || !form.price) {
            return;
           }
            fetch('/api/products', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            .then(res => res.json())
            .then(data => {
            fetchProducts()
            setForm({name: '', price: ''})
    })
    }
    function updateForm (event) {
            const {name, value} = event.target;
            setForm({
                ...form,
                // computed property syntax in JavaScript object literals 
                [name]: value
            })
    }
function deleteHandler (productId) {
        fetch(`/api/products/${productId}`, {
                method: 'DELETE'
        })
        .then((res) => res.json())
        .then(data => {
                fetchProducts()
    })
}

     return (
        <div>
            <h1>Add Product</h1>
            <form onClick={handleSubmit}>
                <input name="name" type="text" value={form.name} placeholder="name" 
                onChange={updateForm}/>
                <input name="price" type="text" value={form.price} placeholder="price" 
                onChange={updateForm}/>
                <button className="btn btn-secondary m-2" type="submit">submit</button>
            </form>
            <hr/>
            <h1>Product List</h1>
            {pro.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {pro.map((product, index) => (
                        <li className="list-group-item" key={index}>{product.name}: ${product.price}
                        <span>
                        <button className="btn btn-secondary m-2" 
                        onClick={() => deleteHandler(product.id)}>
                        delete</button>
                        </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
