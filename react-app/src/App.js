import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ShowAllPosts from "./components/ShowAllPosts/ShowAllPosts";
import SinglePost from "./components/SinglePost/SinglePost";
import CreatePost from "./components/CreatePost/CreatePost";
import UpdatePost from "./components/UpdatePost/UpdatePost"; // Import the UpdatePost component
import Homepage from "./components/Homepage/Homepage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/posts" exact>
            <ShowAllPosts />
          </Route>
          <Route path="/post/:postId" component={SinglePost} />
          <Route path="/posts/new">
            <CreatePost />
          </Route>
          <Route path="/posts/:postId/edit" render={(props) =>
            <UpdatePost postId={props.match.params.postId} />
          } />
          <Redirect to="/posts" />
        </Switch>
      )}
    </>
  );
}

export default App;
