Sure! Here's your full `README.md` content – copy and paste it directly:

---

# Subme

**Subme** is a tier-based subscription content platform where creators can publish exclusive posts with controlled access levels (`VIP`, `Crew`, `Backstage`). Users can also leave comments on each post. The project is powered by **Next.js**, **TypeScript**, and **Sanity CMS**.

> 🧠 **Sanity Studio:** [https://subme.sanity.studio/](https://subme.sanity.studio/)

---

## ✨ Features

* Rich-text post creation using Sanity's block content editor
* Role-based access (`vip`, `crew`, `backstage`) per post
* Cover image support (hotspot, crop, alt)
* Portable Text rendering with full formatting
* Comment system with name, image, and email fields
* Fully typed with TypeScript for better DX
* Modular and scalable codebase

---

## 🧱 Sanity Studio

Sanity Studio is used to manage content for this app. You can visit the studio here:

🔗 **[https://subme.sanity.studio/](https://subme.sanity.studio/)**

You can:

* Create & edit posts
* Upload & configure cover images
* Assign tier-based access levels
* View and manage user comments

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```
git clone https://github.com/yourusername/subme.git
cd subme
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env.local` file

Add the following environment variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
```

> Replace `your_project_id` and `your_sanity_token` with your actual values from Sanity.

### 4. Run the development server

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📘 Types Overview

This project uses a custom `GetPostQueryResult` type for posts returned from Sanity. It includes:

* Basic post metadata: `_id`, `_createdAt`, `_rev`
* `title` (optional)
* `body`: Portable Text array with block-level formatting (headings, blockquote, lists)
* `tierAccess`: `'vip' | 'crew' | 'backstage'`
* `coverImage`: includes `asset`, `hotspot`, `crop`, `alt`
* `comments`: array of comment objects (`_id`, `email`, `comment`, `name`, etc.)

All types are strictly typed with TypeScript for reliability and clarity.

---

## 🧑 Author

Made with ❤️ by [Syed Laeeq Ahmed](https://www.linkedin.com/in/syed-laeeq-ahmed/)

* 📬 Email: [laeeqthedev@icloud.com](mailto:laeeqthedev@icloud.com)
* 🧑‍💻 GitHub: [github.com/LaeeqtheDev](https://github.com/LaeeqtheDev)

---

## 🌍 Deployment

* Frontend: Deploy via [Vercel](https://vercel.com)
* CMS: [Sanity Studio deployed here](https://subme.sanity.studio/)

---

## 📄 License

Free to use for educational or portfolio purposes. Commercial use is prohibited without permission from the author.

---

