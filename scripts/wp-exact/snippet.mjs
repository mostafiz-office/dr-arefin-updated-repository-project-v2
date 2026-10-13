// Create/update the "Awansoft exact pages" PHP snippet through the Code Snippets REST API.
//   WP_APP_PASSWORD=... node scripts/wp-exact/snippet.mjs
// The snippet registers the page meta `awansoft_raw_html` and, on the front end, prints that
// stored HTML document as-is for pages that have it — no theme, Elementor, SEO-plugin or
// wpautop output. Add ?awansoft_legacy=1 to any URL to see the old WordPress version.
const WP_URL = process.env.WP_URL || "https://awansoft.riseup-asia.co";
const WP_USER = process.env.WP_USER || "admin";
const WP_PASS = process.env.WP_APP_PASSWORD;
if (!WP_PASS) throw new Error("Set WP_APP_PASSWORD");
const AUTH = "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");

const NAME = "Awansoft exact pages";
const CODE = String.raw`
add_action('init', function () {
    register_post_meta('page', 'awansoft_raw_html', array(
        'type'          => 'string',
        'single'        => true,
        'show_in_rest'  => true,
        'auth_callback' => function () { return current_user_can('edit_pages'); },
    ));
    register_post_meta('page', 'awansoft_redirect', array(
        'type'          => 'string',
        'single'        => true,
        'show_in_rest'  => true,
        'auth_callback' => function () { return current_user_can('edit_pages'); },
    ));
});

add_action('template_redirect', function () {
    // Removed duplicate pages (e.g. /privacy-policy-2/) now point to the real page.
    if (is_404() && preg_match('#^/privacy-policy-[0-9]+/?$#', strtok($_SERVER['REQUEST_URI'], '?'))) {
        wp_redirect(home_url('/privacy-policy/'), 301); exit;
    }
    if (is_admin() || isset($_GET['awansoft_legacy']) || isset($_GET['elementor-preview'])) return;
    $path = rtrim(strtok($_SERVER['REQUEST_URI'], '?'), '/');
    // Dynamic blog: the WordPress posts rendered into the Lovable-built templates.
    if ($path === '/blog') { aw_blog_send(aw_blog_list_html()); }
    if (is_singular('post') && !is_preview()) { aw_blog_send(aw_blog_post_html(get_queried_object())); }
    if (!is_singular('page')) return;
    $id = get_queried_object_id();
    // Template pages are internal; visitors go to the blog.
    if (strpos(get_post_field('post_name', $id), 'tpl-blog-') === 0) { wp_redirect(home_url('/blog/'), 302); exit; }
    $to = get_post_meta($id, 'awansoft_redirect', true);
    if (is_string($to) && strpos($to, '/') === 0) { wp_redirect(home_url($to), 301); exit; }
    $html = get_post_meta($id, 'awansoft_raw_html', true);
    if (!is_string($html) || strlen($html) < 1000) return;
    status_header(200);
    header('Content-Type: text/html; charset=utf-8');
    header('X-Awansoft-Exact: 1');
    echo $html;
    exit;
}, 0);

// ---------------------------------------------------------------------------
// Dynamic blog. Templates come from the pages /tpl-blog-list and /tpl-blog-post (real Lovable build
// with ⟦AW:…⟧ tokens). Repeated blocks sit between ⟦AW:NAME:S⟧ and ⟦AW:NAME:E⟧.
// ---------------------------------------------------------------------------
function aw_blog_send($html) {
    if (!$html) return;
    status_header(200);
    header('Content-Type: text/html; charset=utf-8');
    header('X-Awansoft-Exact: blog');
    echo $html;
    exit;
}

function aw_blog_tpl($slug) {
    $p = get_page_by_path($slug, OBJECT, 'page');
    $html = $p ? get_post_meta($p->ID, 'awansoft_raw_html', true) : '';
    return (is_string($html) && strlen($html) > 1000) ? $html : '';
}

function aw_blog_topic($post) {
    foreach (get_the_category($post->ID) as $c) { if ($c->slug !== 'uncategorized') return $c->name; }
    return 'Insights';
}

function aw_blog_minutes($post) {
    $words = str_word_count(wp_strip_all_tags($post->post_content));
    return (string) max(1, (int) ceil($words / 200));
}

function aw_blog_summary($post) {
    $img = get_post_thumbnail_id($post->ID);
    $excerpt = has_excerpt($post->ID) ? get_the_excerpt($post) : wp_trim_words(wp_strip_all_tags($post->post_content), 30);
    return array(
        'slug' => $post->post_name,
        'title' => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
        'excerpt' => html_entity_decode(wp_strip_all_tags($excerpt), ENT_QUOTES, 'UTF-8'),
        'date' => get_the_date('Y-m-d', $post),
        'minutes' => aw_blog_minutes($post),
        'topic' => aw_blog_topic($post),
        'cover' => array(
            'src' => $img ? (string) wp_get_attachment_image_url($img, 'full') : '',
            'alt' => $img ? (string) get_post_meta($img, '_wp_attachment_image_alt', true) : '',
        ),
        'featured' => is_sticky($post->ID),
        'mostRead' => has_tag('most-read', $post),
    );
}

function aw_blog_fill($chunk, $s, $prefix, $n = null) {
    $map = array(
        'SLUG' => $s['slug'], 'TITLE' => $s['title'], 'EXCERPT' => $s['excerpt'], 'DATE' => $s['date'],
        'MIN' => $s['minutes'], 'TOPIC' => $s['topic'], 'IMG' => $s['cover']['src'], 'ALT' => $s['cover']['alt'],
    );
    if ($n !== null) $map['N'] = str_pad((string) $n, 2, '0', STR_PAD_LEFT);
    foreach ($map as $k => $v) { $chunk = str_replace('⟦AW:' . $prefix . $k . '⟧', esc_attr($v), $chunk); }
    return $chunk;
}

function aw_blog_repeat($html, $name, $items, $fn) {
    return preg_replace_callback('/⟦AW:' . $name . ':S⟧(.*?)⟦AW:' . $name . ':E⟧/su', function ($m) use ($items, $fn) {
        $out = '';
        foreach (array_values($items) as $i => $it) { $out .= $fn($m[1], $it, $i); }
        return $out;
    }, $html);
}

function aw_blog_head($html, $title, $desc, $url, $type, $image, $ld) {
    $html = preg_replace('#<meta name="robots" content="noindex"\s*/?>#', '', $html);
    $html = str_replace(array('⟦AW:META_TITLE⟧', '⟦AW:META_DESC⟧'), array(esc_html($title), esc_attr($desc)), $html);
    $tags = '<link rel="canonical" href="' . esc_url($url) . '">'
        . '<meta property="og:title" content="' . esc_attr($title) . '">'
        . '<meta property="og:description" content="' . esc_attr($desc) . '">'
        . '<meta property="og:type" content="' . $type . '">'
        . '<meta property="og:url" content="' . esc_url($url) . '">'
        . '<meta name="twitter:card" content="summary_large_image">'
        . ($image ? '<meta property="og:image" content="' . esc_url($image) . '"><meta name="twitter:image" content="' . esc_url($image) . '">' : '')
        . '<script type="application/ld+json">' . wp_json_encode($ld, JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) . '</script>';
    return preg_replace_callback('#</head\s*>#', function () use ($tags) { return $tags . '</head>'; }, $html, 1);
}

function aw_blog_data($html, $data) {
    $json = wp_json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP);
    return preg_replace_callback('#</body\s*>#', function () use ($json) { return '<script type="application/json" id="aw-wp-data">' . $json . '</script></body>'; }, $html, 1);
}

function aw_blog_published($args = array()) {
    return get_posts(array_merge(array('post_type' => 'post', 'post_status' => 'publish', 'numberposts' => 100, 'orderby' => 'date', 'order' => 'DESC'), $args));
}

function aw_blog_list_html() {
    $html = aw_blog_tpl('tpl-blog-list');
    if (!$html) return '';
    $posts = array_map('aw_blog_summary', aw_blog_published());
    $featured = null;
    foreach ($posts as $p) { if ($p['featured']) { $featured = $p; break; } }
    if (!$featured && $posts) $featured = $posts[0];
    $most = array_values(array_filter($posts, function ($p) { return $p['mostRead']; }));
    if (!$most) $most = $posts;
    $most = array_slice($most, 0, 3);
    $topics = array();
    foreach ($posts as $p) { if (!in_array($p['topic'], $topics, true)) $topics[] = $p['topic']; }

    $html = aw_blog_repeat($html, 'CARD', $posts, function ($c, $p) { return aw_blog_fill($c, $p, 'I_'); });
    $html = aw_blog_repeat($html, 'MOST', $most, function ($c, $p, $i) { return aw_blog_fill($c, $p, 'I_', $i + 1); });
    if ($featured) $html = aw_blog_fill($html, $featured, 'F_');
    $url = home_url('/blog/');
    $title = 'ERP Blog & Insights | Awansoft Malaysia';
    $desc = 'Practical articles on Microsoft Dynamics 365, Acumatica, cloud migration and ERP implementation for Malaysian businesses.';
    $ld = array('@context' => 'https://schema.org', '@type' => 'Blog', 'name' => 'Awansoft ERP blog', 'url' => $url,
        'blogPost' => array_map(function ($p) { return array('@type' => 'BlogPosting', 'headline' => $p['title'], 'url' => home_url('/' . $p['slug'] . '/'), 'datePublished' => $p['date']); }, $posts));
    $html = aw_blog_head($html, $title, $desc, $url, 'website', $featured ? $featured['cover']['src'] : '', $ld);
    return aw_blog_data($html, array('mode' => 'list', 'posts' => $posts, 'topics' => $topics));
}

function aw_blog_post_html($post) {
    $html = aw_blog_tpl('tpl-blog-post');
    if (!$html || !$post) return '';
    $s = aw_blog_summary($post);
    $content = apply_filters('the_content', $post->post_content);
    // Give every H2 a stable id for the contents list and its scroll highlighting.
    $sections = array(); $used = array();
    $content = preg_replace_callback('#<h2([^>]*)>(.*?)</h2>#si', function ($m) use (&$sections, &$used) {
        $label = trim(html_entity_decode(wp_strip_all_tags($m[2]), ENT_QUOTES, 'UTF-8'));
        if (preg_match('#\bid="([^"]+)"#', $m[1], $idm)) { $id = $idm[1]; $attrs = $m[1]; }
        else {
            $id = sanitize_title($label) ?: 'section';
            $base = $id; $k = 2;
            while (isset($used[$id])) { $id = $base . '-' . $k++; }
            $attrs = $m[1] . ' id="' . esc_attr($id) . '"';
        }
        $used[$id] = true;
        $sections[] = array('id' => $id, 'label' => $label);
        return '<h2' . $attrs . '>' . $m[2] . '</h2>';
    }, $content);
    $chunks = preg_split('#(?=<h2[\s>])#i', $content);
    $intro = (count($chunks) && stripos(ltrim($chunks[0]), '<h2') !== 0) ? array_shift($chunks) : '';
    $cta = max(1, (int) ceil(count($chunks) * 0.6) - 1);
    $part1 = implode('', array_slice($chunks, 0, $cta + 1));
    $part2 = implode('', array_slice($chunks, $cta + 1));

    $topicCat = null;
    foreach (get_the_category($post->ID) as $c) { if ($c->slug !== 'uncategorized') { $topicCat = $c->term_id; break; } }
    $rel = aw_blog_published(array('numberposts' => 3, 'exclude' => array($post->ID)) + ($topicCat ? array('category' => $topicCat) : array()));
    if (count($rel) < 3) {
        $have = array_merge(array($post->ID), wp_list_pluck($rel, 'ID'));
        $rel = array_merge($rel, aw_blog_published(array('numberposts' => 3 - count($rel), 'exclude' => $have)));
    }
    $related = array_map('aw_blog_summary', $rel);

    $author = get_the_author_meta('display_name', $post->post_author); if (!$author || strtolower($author) === 'admin') $author = 'Awansoft consulting team';
    $yTitle = get_post_meta($post->ID, '_yoast_wpseo_title', true);
    $yDesc = get_post_meta($post->ID, '_yoast_wpseo_metadesc', true);
    $title = (is_string($yTitle) && $yTitle && strpos($yTitle, '%%') === false) ? $yTitle : $s['title'] . ' | Awansoft';
    $desc = (is_string($yDesc) && $yDesc) ? $yDesc : mb_substr($s['excerpt'], 0, 158);
    $url = get_permalink($post);
    $full = array_merge($s, array(
        'author' => $author, 'dateIso' => get_the_date('c', $post), 'modifiedIso' => get_the_modified_date('c', $post),
        'intro' => $intro, 'part1' => $part1, 'part2' => $part2, 'sections' => $sections,
        'cta' => array('label' => 'Talk to a consultant', 'href' => '/contact-us'),
        'metaTitle' => $title, 'metaDescription' => $desc,
    ));

    $html = aw_blog_repeat($html, 'TOC', $sections, function ($c, $sec) {
        return str_replace(array('⟦AW:TOC_ID⟧', '⟦AW:TOC_LABEL⟧'), array(esc_attr($sec['id']), esc_html($sec['label'])), $c);
    });
    $html = aw_blog_repeat($html, 'CARD', $related, function ($c, $p) { return aw_blog_fill($c, $p, 'I_'); });
    // Body HTML first (raw), then the escaped text fields.
    $html = str_replace(array('⟦AW:P_INTRO⟧', '⟦AW:P_PART1⟧', '⟦AW:P_PART2⟧'), array($intro, $part1, $part2), $html);
    $html = str_replace(array('⟦AW:P_AUTHOR⟧', '⟦AW:P_DATE_ISO⟧', '⟦AW:P_MODIFIED_ISO⟧'), array(esc_html($author), esc_attr($full['dateIso']), esc_attr($full['modifiedIso'])), $html);
    $html = aw_blog_fill($html, $s, 'P_');
    $ld = array('@context' => 'https://schema.org', '@graph' => array(
        array('@type' => 'BreadcrumbList', 'itemListElement' => array(
            array('@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => home_url('/')),
            array('@type' => 'ListItem', 'position' => 2, 'name' => 'Blog', 'item' => home_url('/blog/')),
            array('@type' => 'ListItem', 'position' => 3, 'name' => $s['title'], 'item' => $url))),
        array('@type' => 'BlogPosting', 'headline' => $s['title'], 'description' => $desc, 'url' => $url,
            'datePublished' => $full['dateIso'], 'dateModified' => $full['modifiedIso'], 'image' => $s['cover']['src'],
            'author' => array('@type' => 'Person', 'name' => $author), 'publisher' => array('@type' => 'Organization', 'name' => 'Awansoft')),
    ));
    $html = aw_blog_head($html, $title, $desc, $url, 'article', $s['cover']['src'], $ld);
    return aw_blog_data($html, array('mode' => 'post', 'post' => $full, 'related' => $related));
}
`;

async function wp(path, init = {}) {
  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    ...init,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${path} [${res.status}]: ${text.slice(0, 400)}`);
  return JSON.parse(text);
}

const list = await wp("/code-snippets/v1/snippets");
const existing = list.find((s) => s.name === NAME);
const body = JSON.stringify({ name: NAME, code: CODE.trim(), scope: "global", active: true,
  desc: "Serves Awansoft pages as built in the React preview (stored in page meta awansoft_raw_html)." });
const saved = existing
  ? await wp(`/code-snippets/v1/snippets/${existing.id}`, { method: "POST", body })
  : await wp("/code-snippets/v1/snippets", { method: "POST", body });
console.log(`snippet #${saved.id} "${saved.name}" active=${saved.active}`);
