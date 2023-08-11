3 most important hooks:

1- useState - it's just a normal variable which can make a component re-render when the value of the variable is changed
2- useEffect - allows us to perform side effects in our component such as fetching data

Common side effects include:

- Making a request to an API for data from a backend server
- To interact with browser APIs (that is, to use document or window directly)
- Using unpredictable timing functions like setTimeout or setInterval

## 3- useContext - means that you can send all data from a component to all child components

Theme changing color from light mode to dark mode using context.

- In this example, there are two independent contexts. ThemeContext provides the current theme, which is a string, while SomeContext holds the authentication representing signIn/signOut.
- ThemeContext provides the current theme, which is a string
- I used ReactSwitch for switching the theme

---

Doing:
Also add a role parametër such as "normal", "admin" and add a button to switch the role
Show different view for normal and admin user based on the role in the AuthContext

---

- AuthContext - allows you to easily share authentication information and functionality throughout your application, without the need to pass props through multiple components or use global variables
- If your application uses authentication, many of its components will need to know the current user’s authentication state.
- To display an image from a URL, I used the img tag and set its src prop to the complete URL of the image.

---

Authentication - we are going to have a production and a development version so everything that we do on the development version we also need to do on the production version to make sure that they're both in sync with each other
