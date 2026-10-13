// Create/update the "Arefin exact pages" PHP snippet on the STAGING site (Code Snippets REST).
//   node scripts/wp-exact/snippet.mjs
// Pages with meta `arefin_raw_html` are served as-is (no theme/Elementor/Yoast output).
// ?arefin_legacy=1 on any URL shows the old Elementor page. Deactivate the snippet = full rollback.
// Single posts and category archives are served with the Articles page's app shell; the app then
// loads the post/category from the REST API. Title, description and canonical come from Yoast/WordPress.
import { wp } from "./target.mjs";

const NAME = "Arefin exact pages";
const CODE = String.raw`
add_action('init', function () {
    register_post_meta('page', 'arefin_raw_html', array(
        'type' => 'string', 'single' => true, 'show_in_rest' => true,
        'auth_callback' => function () { return current_user_can('edit_pages'); },
    ));
});
// Let administrators upload the build's own aw-*.js / aw-*.css files to the media library.
add_filter('upload_mimes', function ($m) {
    if (current_user_can('manage_options')) { $m['js'] = 'application/javascript'; $m['css'] = 'text/css'; }
    return $m;
});
add_filter('wp_check_filetype_and_ext', function ($d, $file, $filename) {
    if (current_user_can('manage_options') && preg_match('/^aw-[A-Za-z0-9_-]+\.(js|css)$/', $filename, $x)) {
        $d['ext'] = $x[1]; $d['type'] = $x[1] === 'js' ? 'application/javascript' : 'text/css'; $d['proper_filename'] = $filename;
    }
    return $d;
}, 10, 3);
add_action('template_redirect', function () {
    if (is_admin() || isset($_GET['arefin_legacy']) || isset($_GET['elementor-preview']) || is_preview()) return;
    if (is_singular('post') || is_category()) { arefin_serve_blog_shell(); return; }
    if (!is_singular('page') && !is_front_page()) return;
    $id = is_front_page() ? (int) get_option('page_on_front') : get_queried_object_id();
    if (!$id) return;
    $html = get_post_meta($id, 'arefin_raw_html', true);
    if (!is_string($html) || strlen($html) < 1000) return;
    status_header(200);
    header('Content-Type: text/html; charset=utf-8');
    header('X-Arefin-Exact: 1');
    echo $html;
    exit;
}, 0);
function arefin_serve_blog_shell() {
    $shell_page = get_page_by_path('articles');
    if (!$shell_page) return;
    $html = get_post_meta($shell_page->ID, 'arefin_raw_html', true);
    if (!is_string($html) || strlen($html) < 1000) return;
    $title = wp_get_document_title();
    $desc = '';
    $canonical = is_category() ? get_category_link(get_queried_object_id()) : get_permalink();
    if (function_exists('YoastSEO')) {
        $m = YoastSEO()->meta->for_current_page();
        if ($m) { $title = $m->title ?: $title; $desc = $m->description ?: ''; $canonical = $m->canonical ?: $canonical; }
    }
    if (!$desc) $desc = is_category() ? wp_strip_all_tags(category_description()) : wp_strip_all_tags(get_the_excerpt(get_queried_object_id()));
    $html = preg_replace('#<title>.*?</title>#s', '<title>' . esc_html($title) . '</title>', $html, 1);
    $html = preg_replace('#<meta name="description" content="[^"]*"#', '<meta name="description" content="' . esc_attr(wp_trim_words($desc, 40, '…')) . '"', $html, 1);
    $html = preg_replace('#<link rel="canonical" href="[^"]*"#', '<link rel="canonical" href="' . esc_url($canonical) . '"', $html, 1);
    status_header(200);
    header('Content-Type: text/html; charset=utf-8');
    header('X-Arefin-Exact: blog');
    echo $html;
    exit;
}
`;

const list = await wp("/code-snippets/v1/snippets");
const existing = list.find((s) => s.name === NAME);
const body = JSON.stringify({ name: NAME, code: CODE.trim(), scope: "global", active: true,
  desc: "Serves Lovable-built pages stored in arefin_raw_html. Deactivate to restore Elementor pages." });
const saved = existing
  ? await wp(`/code-snippets/v1/snippets/${existing.id}`, { method: "POST", body })
  : await wp("/code-snippets/v1/snippets", { method: "POST", body });
console.log(`snippet ${saved.id} "${saved.name}" active=${saved.active}`);
