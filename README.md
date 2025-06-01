Here’s a detailed `README.md` for your **Subme** project, including purpose, setup instructions, tech stack, and links to the deployed [Sanity Studio](https://subme.sanity.studio/):

---

````md
# Subme

**Subme** is a subscription-based content platform where creators can publish tiered-access posts (e.g., for VIP, Crew, or Backstage members) and receive comments from readers. The platform is powered by **Next.js**, **Sanity CMS**, and **TypeScript** with structured content modeling.

> 🌐 **Sanity Studio:** [https://subme.sanity.studio/](https://subme.sanity.studio/)

---

## 📸 Features

- 📝 Rich text post creation via Sanity Studio
- 🔐 Tiered access control for content (VIP, Crew, Backstage)
- 🧑‍💬 User comments support with name, email, and image
- 🖼️ Cover images with support for crop, hotspot, alt text
- 🔄 Dynamic rendering of block content in frontend
- 💬 Markdown-style comments linked to each post
- 🚀 Fully typed with TypeScript

---

## 🏗️ Tech Stack

| Technology      | Purpose                                  |
|----------------|-------------------------------------------|
| **Next.js**     | Frontend rendering & routing             |
| **Sanity CMS**  | Headless content management              |
| **TypeScript**  | Type safety and developer experience     |
| **Tailwind CSS**| (If used) Styling                        |
| **Portable Text** | Rich content blocks rendering         |

---

## 🧱 Sanity Studio

Sanity Studio is hosted and accessible at:

👉 **[https://subme.sanity.studio/](https://subme.sanity.studio/)**

There, you can:
- Create/edit/delete posts
- Upload cover images
- Set tier access per post
- Manage comments
- Structure content using block editor

---

## 🛠️ Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/subme.git
cd subme
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file and include your Sanity project configuration:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_admin_or_read_token
```

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## 🧩 Types Overview

The core type is `GetPostQueryResult`, which represents the full post object including:

* `_id`, `_createdAt`, `_rev` metadata
* `title` and `body` (Portable Text)
* `tierAccess` (VIP, Crew, Backstage)
* `coverImage` with `hotspot`, `crop`, and `alt`
* Nested `comments` with user info

---

## ✍️ Author

Made by [Syed Laeeq Ahmed](https://www.linkedin.com/in/syed-laeeq-ahmed/)

> 📬 Email: [laeeqthedev@icloud.com](mailto:laeeqthedev@icloud.com)
> 🔗 GitHub: [github.com/LaeeqtheDev](https://github.com/LaeeqtheDev)

---

## 📦 Deployment

* Frontend can be deployed via **Vercel**
* Sanity Studio is already deployed at [subme.sanity.studio](https://subme.sanity.studio)

---

## 🔐 License

This project is open-sourced for learning and personal portfolio usage. For commercial use, please contact the author.

```

---

Let me know if you'd like to include:

- Screenshots or a demo GIF
- Instructions for running Sanity Studio locally
- API routes / GROQ query details
- Deployment badge for Vercel or Netlify

I can also create a markdown version with those additions.
```
