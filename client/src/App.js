import { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./context/user";
import { Container } from 'react-bootstrap'
import NavBar from "./NavBar";
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import SaleDetail from './SaleDetail'
import SalesList from "./SalesList";
import SalesListByTag from "./SalesListByTag";
import Inbox from "./Inbox";

function App() {
  const { user, setUser } = useContext(UserContext)
  const [salesPosts, setSalesPosts] = useState([])

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [setUser]);

  useEffect(() => {
    fetch("/sales_posts")
      .then((r) => r.json())
      .then((data) => setSalesPosts(data));
  }, []);

  function handleAddSalesPost(newSalesPost) {
    setSalesPosts([...salesPosts, newSalesPost])
  };

  function handleDeleteSalesPost(id) {
    const updatedSalesPosts = salesPosts.filter((sale) => sale.id !== id);
    setSalesPosts(updatedSalesPosts)
  };

  function handleUpdateSalesPost(updatedSalesPost) {
    const updatedSalesPosts = salesPosts.map((sale) => {
      if (sale.id === updatedSalesPost.id) {
        return updatedSalesPost
      } else {
        return sale
      }
    })
    setSalesPosts(updatedSalesPosts)
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Container>
      <NavBar />
      <Switch>
        <Route exact path="/inbox">
          <Inbox />
        </Route>
        <Route exact path="/sales">
          <SalesList
            salesPosts={salesPosts}
            onAddSalesPost={handleAddSalesPost}
            onUpdateSalesPost={handleUpdateSalesPost}
            onDeleteSalesPost={handleDeleteSalesPost}
          />
        </Route>
        <Route path="/sales/:id">
          <SaleDetail />
        </Route>
        <Route path="/tag/:id">
          <SalesListByTag />
        </Route>
        <Route exact path="/profile/:id">
          <Profile />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
