# 15. Dynamic pages (WordPress posts in the Lovable design)

Use this when content must be edited in WordPress (blog posts, news) but must look exactly like the Lovable design.

1. **One data model, one view.** Render the list and the single item from a plain data object. In the preview the object comes from local content. On WordPress it comes from `<script id="aw-wp-data">` and is read inside the route loaders.
2. **Token templates.** Add hidden routes that render the same views with token strings (`⟦AW:TITLE⟧`). Wrap every repeated block in `⟦AW:NAME:S⟧ … ⟦AW:NAME:E⟧` text sentinels. Build and deploy them like normal pages. Do not start their slugs with `aw-`, because that prefix is reserved for build files.
3. **Snippet.** For the list address and for `is_singular('post')`:
   - load the template meta and repeat the blocks with `preg_replace_callback`;
   - fill the tokens with `esc_attr` for text and raw `the_content` HTML for the body;
   - add canonical, Open Graph and JSON-LD before `</head\s*>`;
   - add the JSON before `</body\s*>`.
4. **Pitfalls found:**
   - `readable-html.py` writes `</head\n>`, so match the closing tags with `\s*`.
   - Use callback replacements, because JSON contains backslashes that `preg_replace` would treat as references.
   - Use plain `<a href>` links between posts, because every post is its own server page.
5. **Hydration.** The template's own route data does not match the post address, so TanStack runs the loader on the client and reads the embedded JSON. That is expected.

Awansoft reference: `spec/awansoft-deploy-spec/dynamic-pages/01-blog-index-and-post.md`.
