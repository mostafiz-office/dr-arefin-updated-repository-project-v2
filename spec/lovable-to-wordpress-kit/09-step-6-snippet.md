# 09 — Step 6: The Serving Snippet

Install via Code Snippets REST: `GET /wp-json/code-snippets/v1/snippets`; if a snippet named "{{PREFIX}} exact pages" exists `POST .../snippets/<id>`, else `POST .../snippets`, body `{name, code, scope:"global", active:true, desc}`. Run this **before** step 5.

```php
add_action('init', function () {
    foreach (array('{{PREFIX}}_raw_html', '{{PREFIX}}_redirect') as $key) {
        register_post_meta('page', $key, array(
            'type' => 'string', 'single' => true, 'show_in_rest' => true,
            'auth_callback' => function () { return current_user_can('edit_pages'); },
        ));
    }
});

add_action('template_redirect', function () {
    if (is_admin() || !is_singular('page')) return;
    if (isset($_GET['{{PREFIX}}_legacy']) || isset($_GET['elementor-preview'])) return;
    $id = get_queried_object_id();
    $to = get_post_meta($id, '{{PREFIX}}_redirect', true);
    if (is_string($to) && strpos($to, '/') === 0) { wp_redirect(home_url($to), 301); exit; }
    $html = get_post_meta($id, '{{PREFIX}}_raw_html', true);
    if (!is_string($html) || strlen($html) < 1000) return;   // fall back to normal WP page
    status_header(200);
    header('Content-Type: text/html; charset=utf-8');
    header('X-{{PREFIX}}-Exact: 1');
    echo $html;
    exit;
}, 0);
```

Behaviour
- `?{{PREFIX}}_legacy=1` shows the original WordPress page (debug/compare).
- Redirect targets must start with `/` (no open redirects).
- Header `X-{{PREFIX}}-Exact: 1` lets checks confirm the exact copy was served.
- Front page works because WordPress's static front page is a page (`is_singular('page')`). Set Settings → Reading → static front page to the homepage ID.
