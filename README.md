# web-valentine

# 💌 A Valentine App

A small Next.js web application built for a fun, interactive Valentine experience.  
The app includes a secret "soft" authentication system and playful animations, deployed on **Vercel**.

Try it out [here](https://will-you-be-my-web-valentine.vercel.app/)
```Hint: 0A/01/7E8```

## ⚙️ Environment Variables
### Create a .env.local file:
```
NEXT_PUBLIC_SITE_HASH_VALUE = your_sha256_hash_here
```
The stored value should be the SHA-256 hash of the password.

### Run and enter the password you want to use
```
node .\scripts\hash-password.mjs
```

## Getting Setup (Local Development)
1. Clone the repository
```
git clone https://github.com/Michael-David-Lam/valentine.git
cd valentine
```
2. Install dependencies
```
npm install
```

4. Run development server
```
npm run dev
```


5. Visit:

```
http://localhost:3000
```

6. Test the production build locally:
```
npx next build
npx next start
```
## Deployment
Import repository into a Vercel project
- Ensure you import the ```.env.local```
- Additionally modify the root directory to ```/valentine```

