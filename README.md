# Listings Service

This project is a Next.js web application that interacts with an API to display listing data. The application allows users to view listings categorized as "sublease" and "3PL", as well as filter by various parameters.

## Technologies

- Next.js 15
- TypeScript
- Tailwind CSS
- ShadCN UI (UI components)
- Axios (HTTP client)

## Functionality

- JWT authorization via API with automatic token refresh
- Retrieving and displaying listings
- Categorization of listings into "sublease" and "3PL"
- Filtering listings by type, price, and area
- Responsive design for various devices
- Handling loading and error states

## JWT Authorization

The project implements a JWT authorization system:
- Obtaining a pair of tokens (access and refresh) upon successful authorization
- Automatic renewal of the access token when it expires using the refresh token
- Error handling when both tokens expire with a prompt to log in again
- Resending requests after automatic token refresh

API endpoints used:
- `/auth/jwt/create/` - obtaining JWT tokens
- `/auth/jwt/refresh/` - refreshing the access token

## Installation and Running

### Prerequisites

- Node.js (version 18+)
- npm or yarn

### Installing Dependencies

```bash
npm install
# or
yarn install
```

### Running in Development Mode

```bash
npm run dev
# or
yarn dev
```

After executing this command, the application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running the Built Application

```bash
npm run start
# or
yarn start
```

## Project Structure

- `/src/app` - main application files (routing, pages)
- `/src/components` - common components
- `/src/services` - services for working with the API
- `/src/types` - TypeScript types

## Development Notes

The following decisions were made during development:

1. Client-side data fetching approach (`useEffect`) was used to demonstrate working with loading/error states on the client side.
2. Tailwind CSS combined with ShadCN components was used to create a modern responsive interface.
3. Filtering by multiple parameters was implemented, which improves the UX of the application.
4. Handling of various states (loading, error, empty results) was added, making the application more responsive and user-friendly.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
