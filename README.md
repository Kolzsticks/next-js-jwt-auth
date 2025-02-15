# Next.js JWT Authentication Demo

This repository demonstrates how to implement JWT-based authentication in Next.js without relying on third-party authentication libraries. It uses Next.js's App Router, API routes, and the [jose](https://github.com/panva/jose) library for JWT generation and verification. JWT tokens are securely stored in HTTP-only cookies for session management. The project also uses Tailwind CSS for styling and Zod for input validation.

## Features

- **JWT Authentication:**  
  Generate and verify JWT tokens using the `jose` library.
- **Session Management:**  
  Store JWT tokens in HTTP-only cookies.
- **Input Validation:**  
  Validate login form inputs using Zod.
- **Protected Routes:**  
  Only authenticated users can access protected pages (e.g., dashboard).
- **Responsive UI:**  
  Styled with Tailwind CSS for a modern, responsive interface.
- **Login & Logout Functionality:**  
  A dedicated LoginButton component for submitting the login form and a secure logout mechanism that clears the JWT token.

## Project Structure

```
.
├── app
│   ├── api
│   │   ├── login
│   │   │   └── route.ts       # API route for login: validates input, authenticates user, and sets JWT cookie.
│   │   └── logout
│   │       └── route.ts       # API route for logout: clears the JWT cookie.
│   ├── auth.ts                # Authentication helper functions using jose (signIn and getSession).
│   ├── dashboard
│   │   └── page.tsx           # Protected dashboard page displaying user info and a logout button.
│   ├── components
│   │   └── LoginButton.tsx    # Client component for the login button.
│   ├── lib
│   │   └── zod.ts             # Zod schema for validating login form data.
│   └── login
│       └── page.tsx           # Login page with a form, inline error messages, and Tailwind CSS styling.
├── middleware.ts              # (Optional) Middleware to further protect routes.
├── package.json
├── .env.local                 # Environment file containing JWT_SECRET and other configuration.
└── README.md
```

## Detailed Explanation

### JWT Authentication (`app/auth.ts`)
- **signIn Function:**  
  - Extracts user credentials from the submitted form data.
  - Verifies credentials against hardcoded demo values (`user@example.com` and `password`).
  - Uses the `jose` library to generate a JWT token that expires in 1 hour.
  - Stores the token in an HTTP-only cookie named `currentUser`.

- **getSession Function:**  
  - Retrieves the JWT token from cookies using our cookie store method.
  - Verifies and decodes the token using the secret key.
  - Returns the decoded payload (user data) if the token is valid; otherwise, returns `null`.

### Login API Route (`app/api/login/route.ts`)
- **Functionality:**  
  - Receives POST requests with login credentials.
  - Validates input using a Zod schema defined in `app/lib/zod.ts`.
  - Calls `signIn` to authenticate the user and set the JWT cookie.
  - Returns a JSON response indicating success or detailed error messages.

### Logout API Route (`app/api/logout/route.ts`)
- **Functionality:**  
  - Receives POST requests to log out.
  - Clears the JWT cookie by setting its value to an empty string and expiring it.
  - Returns a JSON response indicating successful logout.

### Login Page (`app/login/page.tsx`)
- **Functionality:**  
  - Renders a Tailwind CSS-styled login form.
  - Imports and uses the **LoginButton** component from `app/components/LoginButton.tsx` to handle form submission.
  - Displays inline error messages if validation fails or credentials are invalid.
  - Redirects the user to the dashboard upon successful login.

### Login Button Component (`app/components/LoginButton.tsx`)
- **Functionality:**  
  - A client component that renders the login button.
  - Handles form submission logic or can be used in conjunction with the login page for a cleaner separation of concerns.

### Dashboard Page (`app/dashboard/page.tsx`)
- **Functionality:**  
  - A protected page that uses `getSession` to verify a valid JWT session.
  - Displays a welcome message with the user's email.
  - Includes a logout mechanism (for example, via a logout button integrated in the dashboard).

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Kolzsticks/next-js-jwt-auth.git
   cd next-auth-jwt
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Environment Variables:**
   - Create a `.env.local` file in the root directory.
   - Add the following line with a strong, random secret:
     ```
     JWT_SECRET=V7r!9zQ#d8^T5s%K2x@L0fN&bW3mE6p#Y4u!R8c*J1v^S3q
     ```
     *(This is a sample value; for production, generate your own secure secret.)*

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:3000` to use the application.

## Usage

- **Login:**
  - Visit the `/login` page.
  - Use the following credentials for this demo:
    - **Email:** `user@example.com`
    - **Password:** `password`
  - On successful login, a JWT token is generated, stored in an HTTP-only cookie, and you are redirected to the dashboard.
  - If there are any errors, inline error messages will be displayed.

- **Dashboard:**
  - The dashboard displays a welcome message along with a logout button.
  - It is only accessible if a valid JWT session exists.

- **Logout:**
  - Click the "Log Out" button (integrated into the dashboard or provided separately) to clear the JWT token and be redirected back to the login page.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions, improvements, or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).
