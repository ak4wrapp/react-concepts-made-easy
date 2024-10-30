import React, { createContext, useContext, useState, useEffect } from "react";
import "./styles.css"; // Ensure this CSS file is created
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import Prism from "prismjs";

const UserContext = createContext("");

const UseContextDemo = () => {
  const [user, setUser] = useState("Kirar");

  const defineContextCode = `const UserContext = createContext("");`;
  const setContextCode = `const [user, setUser] = useState("Kirar");
<UserContext.Provider value={user}>`;

  useEffect(() => {
    Prism.highlightAll(); // Highlight code after rendering
  }, []);

  return (
    <>
      <b>First Define UserContext On Global Scope</b>
      <pre>
        <code className="language-javascript">{defineContextCode}</code>
      </pre>
      <UserContext.Provider value={user}>
        <div className="parent-container">
          <h1>Parent Component</h1>
          <h2>Setting User Here</h2>
          <pre>
            <code className="language-javascript">{setContextCode}</code>
          </pre>
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
  const displayingUserFromContext = `<span>Hello, {user}!</span>`;

  return (
    <div className="great-grandchild-container">
      <h4>Great Grand Child Component</h4>
      <h5>Reading User Here</h5>
      <pre>
        <code className="language-javascript">{readingContextCode}</code>
        <br />
        <code className="language-javascript">{displayingUserFromContext}</code>
      </pre>
      <span>Hello, {user}!</span>
    </div>
  );
};

export default UseContextDemo;
