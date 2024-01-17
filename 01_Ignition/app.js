const root = ReactDOM.createRoot(document.getElementById("root"));

const heading = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    React.createElement("h1", { id: "h1tag" }, "I am in H1")
  )
);

root.render(heading);
