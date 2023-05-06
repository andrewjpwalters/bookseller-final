import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./context/user";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import SaleDetail from "./SaleDetail";
import SalesList from "./SalesList";
import SalesListByTag from "./SalesListByTag";
import Inbox from "./Inbox";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [salesPosts, setSalesPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Not authorized");
        }
      })
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, [setUser]);

  useEffect(() => {
    fetch("/sales_posts")
      .then((r) => r.json())
      .then((data) => setSalesPosts(data));
  }, []);

  function handleAddSalesPost(newSalesPost) {
    setSalesPosts([...salesPosts, newSalesPost]);
  }

  function handleDeleteSalesPost(id) {
    const updatedSalesPosts = salesPosts.filter((sale) => sale.id !== id);
    setSalesPosts(updatedSalesPosts);
  }

  function handleUpdateSalesPost(updatedSalesPost) {
    const updatedSalesPosts = salesPosts.map((sale) => {
      if (sale.id === updatedSalesPost.id) {
        return updatedSalesPost;
      } else {
        return sale;
      }
    });
    setSalesPosts(updatedSalesPosts);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user === null) {
    return (
      <Container>
        <Switch>
          <Route exact path="/login">
            <Login onLogin={setUser} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Container>
    );
  }

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
        <Route>
          <h1>404 NOT FOUND</h1>
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
