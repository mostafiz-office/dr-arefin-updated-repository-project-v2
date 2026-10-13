// Create/update the "Arefin exact pages" PHP snippet on the STAGING site (Code Snippets REST).
//   node scripts/wp-exact/snippet.mjs
// Pages with meta `arefin_raw_html` are served as-is (no theme/Elementor/Yoast output).
// ?arefin_legacy=1 on any URL shows the old Elementor page. Deactivate the snippet = full rollback.
// Blog/category templating (kit spec 15) is added later; posts/categories are untouched for now.
import { wp } from "./target.mjs";

const NAME = "Arefin exact pages";
const CODE = String.raw`
add_action('init', function () {
    register_post_meta('page', 'arefin_raw_html', array(
        'type' => 'string', 'single' => true, 'show_in_rest' => true,
        'auth_callback' => function () { return current_user_can('edit_pages'); },
    ));
});
add_action('template_redirect', function () {
    if (is_admin() || isset($_GET['arefin_legacy']) || isset($_GET['elementor-preview']) || is_preview()) return;
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
`;

const list = await wp("/code-snippets/v1/snippets");
const existing = list.find((s) => s.name === NAME);
const body = JSON.stringify({ name: NAME, code: CODE.trim(), scope: "global", active: true,
  desc: "Serves Lovable-built pages stored in arefin_raw_html. Deactivate to restore Elementor pages." });
const saved = existing
  ? await wp(`/code-snippets/v1/snippets/${existing.id}`, { method: "POST", body })
  : await wp("/code-snippets/v1/snippets", { method: "POST", body });
console.log(`snippet ${saved.id} "${saved.name}" active=${saved.active}`);
