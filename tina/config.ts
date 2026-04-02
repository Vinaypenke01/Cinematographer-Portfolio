import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: "e8c36e58-6794-4d99-932b-3fdb286bae31",
  // Get this from tina.io
  token: "00283cfc455cff97004973b574f45f33283f4cbc",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "project",
        label: "Signature Projects",
        path: "content/projects",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "image", name: "videoUrl", label: "Video/Image URL (mp4 or jpg)" },
          { type: "string", name: "duration", label: "Duration" },
          { type: "string", name: "location", label: "Location" },
          { type: "string", name: "genre", label: "Genre" },
          { type: "string", name: "year", label: "Year" },
        ],
      },
      {
        name: "reel",
        label: "Reels Showcase",
        path: "content/reels",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "category", label: "Category", options: ["Cinematic", "Drone Shots", "Events", "Reels", "All"] },
          { type: "string", name: "views", label: "Views (e.g. 1.2M)" },
          { type: "image", name: "videoUrl", label: "Video URL" },
          { type: "image", name: "thumb", label: "Thumbnail Fallback URL" },
        ],
      },
      {
        name: "homepage",
        label: "Homepage Global Data",
        path: "content/global",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "image", name: "backgroundMedia", label: "Background Video/Image" },
            ]
          },
          {
            type: "object",
            name: "about",
            label: "Behind the Camera",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "bioParagraph1", label: "Bio Paragraph 1", ui: { component: "textarea" } },
              { type: "string", name: "bioParagraph2", label: "Bio Paragraph 2", ui: { component: "textarea" } },
              { type: "image", name: "profileImage", label: "Profile Image" },
              { 
                type: "object",
                name: "stats",
                label: "Stats",
                list: true,
                fields: [
                  { type: "string", name: "value", label: "Value (e.g. 10+)" },
                  { type: "string", name: "label", label: "Label" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "services",
            label: "Services Section",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "emoji", label: "Emoji Icon" },
              { type: "string", name: "iconName", label: "Lucide Icon Name (Camera, Plane, Film, Sparkles)" },
            ]
          },
          {
            type: "object",
            name: "testimonials",
            label: "Client Reactions",
            list: true,
            fields: [
              { type: "string", name: "user", label: "Username" },
              { type: "string", name: "avatar", label: "Avatar Emoji" },
              { type: "string", name: "text", label: "Reaction Text" },
              { type: "string", name: "time", label: "Time Prefix (e.g. 2h, 1d)" },
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "location", label: "Location" },
            ]
          }
        ],
      }
    ],
  },
});
