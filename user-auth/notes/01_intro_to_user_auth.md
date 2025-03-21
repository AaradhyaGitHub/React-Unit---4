# React Authentication: A Comprehensive Guide

## Table of Contents
1. [Understanding Authentication](#understanding-authentication)
2. [Authentication Approaches](#authentication-approaches)
   - [Server-side Sessions](#server-side-sessions)
   - [Authentication Tokens](#authentication-tokens)
3. [Routing with Query Parameters](#routing-with-query-parameters)
4. [Authentication Implementation](#authentication-implementation)
5. [Code Breakdown](#code-breakdown)
6. [Displaying Authentication Errors](#displaying-authentication-errors)

## Understanding Authentication

Authentication is the process of verifying a user's identity to grant access to protected resources.

> **Key Points:**
> - Certain resources like backend routes should be protected
> - The front-end must authenticate before accessing protected backend resources

### Basic Authentication Flow:

1. Client sends a request with user credentials
2. Backend validates or creates a new user
3. Backend responds with access granted or denied

However, a simple "yes" or "no" response from the server is **not enough** for ongoing authentication. This approach is insecure because:
- It can be easily faked by the client
- There's no way to verify the authenticity of subsequent requests

## Authentication Approaches

### Server-side Sessions

```
┌─────────┐                             ┌─────────┐
│         │  1. Login (email/password)  │         │
│ Client  │ ─────────────────────────►  │ Server  │
│         │                             │         │
│         │  2. Session ID              │         │
│         │ ◄─────────────────────────  │         │
│         │                             │         │
│         │  3. Request + Session ID    │         │
│         │ ─────────────────────────►  │         │
│         │                             │         │
└─────────┘                             └─────────┘
```

**Characteristics:**
- Popular for traditional full-stack applications
- After authentication, a unique identifier (session ID) is created
- The server stores this session ID mapped to the specific client
- Client sends this ID with future requests to access protected resources
- Server checks the ID and grants access if valid
- Requires tight coupling between frontend and backend

**Drawbacks for React Apps:**
- React apps typically communicate with decoupled backend APIs
- These APIs may not be designed to store client-side session information

### Authentication Tokens

```
┌─────────┐                             ┌─────────┐
│         │  1. Login (email/password)  │         │
│ Client  │ ─────────────────────────►  │ Server  │
│         │                             │         │
│         │  2. JWT Token               │         │
│         │ ◄─────────────────────────  │         │
│         │                             │         │
│         │  3. Request + JWT Token     │         │
│         │ ─────────────────────────►  │         │
│         │                             │         │
└─────────┘                             └─────────┘
```

**Process:**
1. After authenticating a user, the server creates a permission token (often a JWT)
2. The server sends this token back to the client
3. The token can only be validated by the backend that created it (using a private key)
4. For future requests, the client attaches the token to access protected resources
5. The server validates the token and grants permission if valid

**Advantages:**
- Better suited for decoupled architectures (like React with separate APIs)
- Stateless - the server doesn't need to store session information
- Scalable across multiple backend servers

## Routing with Query Parameters

In React applications, we often need to toggle between login and signup forms. This can be accomplished using query parameters instead of component state.

### Traditional State-Based Approach:

```jsx
const [isLogin, setIsLogin] = useState(true);

function switchAuthHandler() {
  setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
}
```

### Query Parameter Approach:

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const isLogin = searchParams.get('mode') === 'login';
```

With this approach, we can:
- Create dynamic links that toggle between login and signup modes
- Directly navigate to a specific mode via URL
- Preserve the mode across page refreshes

**Example Link Component:**
```jsx
<Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
  {isLogin ? "Create new user" : "Login"}
</Link>
```

## Authentication Implementation

The authentication process involves both frontend and backend components:

**Backend Responsibilities:**
- Validate email and password
- Create new users during signup
- Generate authentication tokens
- Validate tokens for protected routes

**Frontend Responsibilities:**
- Collect user credentials
- Send authentication requests
- Store received tokens
- Include tokens in subsequent requests
- Handle authentication errors

## Code Breakdown

Let's analyze the `AuthenticationPage` component and its `action` function:

```jsx
import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request, params }) {
  // Extract mode from URL query parameters
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login"; // Default to login
  
  // Get form data from the request
  const data = await request.formData();

  // Validate the mode
  if (mode !== "login" && mode !== "signup") {
    throw json(
      { message: "Unsupported" },
      { status: 422 }
    );
  }

  // Extract credentials from form data
  const authData = {
    email: data.get("email"),
    password: data.get("password")
  };

  // Send authentication request to the backend
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authData)
  });

  // Handle validation errors (422) or unauthorized (401)
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  // Handle other errors
  if (!response.ok) {
    throw json(
      { message: "Could not authenticate user..." },
      { status: 500 }
    );
  }
  
  // Successful authentication - redirect to home page
  return redirect('/')
}
```

### Step-by-Step Explanation:

1. **Component Structure**:
   - The main component `AuthenticationPage` simply renders the `AuthForm` component
   - The action function is exported separately and will be linked to the form's submission

2. **Action Function** (Called when the form is submitted):
   - **Parameter**: Receives an object with `request` and `params` properties
   - `request` contains the form submission data and URL information
   - `params` would contain route parameters (not used here)

3. **Mode Extraction**:
   - Creates a `URL` object from the request URL
   - Extracts the `mode` query parameter (login or signup)
   - Falls back to "login" if no mode is specified

4. **Form Data Extraction**:
   - Uses `request.formData()` to get the form data
   - This is an asynchronous operation, so we use `await`

5. **Mode Validation**:
   - Checks if the mode is either "login" or "signup"
   - If not, throws an error with a 422 status code (Unprocessable Entity)
   - The `json` function from React Router creates a response with JSON data

6. **Authentication Data Preparation**:
   - Creates an object with email and password from the form data

7. **Backend Request**:
   - Makes a POST request to either `/login` or `/signup` endpoint
   - Sets the appropriate headers and sends the credentials as JSON

8. **Error Handling**:
   - If the response status is 422 or 401, returns the response directly
   - This allows the form component to access validation errors
   - For other errors, throws a generic error with a 500 status code

9. **Successful Authentication**:
   - If everything succeeds, redirects to the home page ('/')
   - The token handling would typically happen here (storing in localStorage, etc.)

## Displaying Authentication Errors

Next Up!
