This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Demo Video
https://drive.google.com/file/d/1FKXQzAnTVrCs7Rdv6xSh2DudySEXY0ig/view?usp=sharing


## Add Environment Variables To Run Locally
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Endpoints
```GET /companies```: 
Returns a list of Company objects

```
Company = {
    company_id: string,
    company_name: string,
    head_count: number, // calculated
    job_postings: number, // calculated
    addressable_company_Name: string,
    website: string,
    company_linkedin_url: string,
    company_linkedin_id: string,
    num_employees_on_linkedin: number,
    size: string,
    industry: string,
    city?: string,
    state?: string,
    country: string,
}
```
```GET /companies/:id```
Returns a single Company object

```GET /companies/:id/persons```
Returns a list of Person objects given a companyId

``` 
Person = {
    first_name: string,
    last_name: string,
    title: string,
    persona_type: string,
    persona_match_score: number,
    persona_linkedin_url: string,
    in_job_since: string,
    timezone?: string,
    member_state?: string,
    member_country: string
}
```

```GET /companies/:id/jobPostings```
Returns a list of JobPosting objects given a companyId

```
JobPosting = {
    job_type: string,
    matching_context: JSON,
    title: string,
    url: string
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
