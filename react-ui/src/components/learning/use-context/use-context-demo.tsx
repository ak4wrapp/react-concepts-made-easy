import React, { createContext, useContext, useState } from "react";
import "./styles.css"; // Make sure to create this CSS file

const UserContext = createContext("");

const UseContextDemo = () => {
  const [user, setUser] = useState("Kirar");

  const defineContextCode = `const UserContext = createContext("")`;
  const setContextCode = `const [user, setUser] = useState("Kirar");
  <UserContext.Provider value={user}>`;
  return (
    <>
      <b>First Define UserContex On Global Scope</b>
      <pre>{defineContextCode}</pre>
      <UserContext.Provider value={user}>
        <div className="parent-container">
          <h1>Parent Component</h1>
          <h2>Setting User Here</h2>
          <pre>{setContextCode}</pre>
          <ChildComponent />
        </div>
      </UserContext.Provider>
    </>
  );
};

const ChildComponent = () => {
  return (
    <div className="child-container">
      <h2>Child Component</h2>
      <GrandChildComponent />
    </div>
  );
};

const GrandChildComponent = () => {
  return (
    <div className="grandchild-container">
      <h4>Grand Child Component</h4>
      <GreatGrandChildComponent />
    </div>
  );
};

const GreatGrandChildComponent = () => {
  const user = useContext(UserContext);
  const readingContextCode = `const user = useContext(UserContext);`;
  return (
    <div className="great-grandchild-container">
      <h4>Great Grand Child Component</h4>
      <h5>Reading User Here</h5>
      <pre>{readingContextCode}</pre>
      <span>Hello, {user}!</span>
    </div>
  );
};

export default UseContextDemo;
