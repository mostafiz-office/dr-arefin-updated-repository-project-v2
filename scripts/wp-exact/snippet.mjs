// Create/update the "Arefin exact pages" PHP snippet on the STAGING site (Code Snippets REST).
//   node scripts/wp-exact/snippet.mjs
// Pages with meta `arefin_raw_html` are served as-is (no theme/Elementor/Yoast output).
// ?arefin_legacy=1 on any URL shows the old Elementor page. Deactivate the snippet = full rollback.
// Single posts and category archives are served with the Articles page's app shell; the app then
// loads the post/category from the REST API. Title, description and canonical come from Yoast/WordPress.
import { wp } from "./target.mjs";

const NAME = "Arefin exact pages";
const CODE = String.raw`
// Staging clone came with "Plain" permalinks; the live site (and every Lovable link) uses /%postname%/.
add_action('init', function () {
    if (get_option('permalink_structure') !== '/%postname%/') {
        update_option('permalink_structure', '/%postname%/');
        flush_rewrite_rules(true);
    }
}, 99);
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
// Contact-page appointment form receiver: saves each request (private "arefin_request" posts,
// visible in wp-admin > Appointment requests) and emails the same inbox the old Elementor form used.
add_action('init', function () {
    register_post_type('arefin_request', array(
        'label' => 'Appointment requests', 'public' => false, 'show_ui' => true,
        'menu_icon' => 'dashicons-email', 'supports' => array('title', 'editor'),
        'capability_type' => 'post', 'capabilities' => array('create_posts' => 'do_not_allow'), 'map_meta_cap' => true,
    ));
});
add_action('rest_api_init', function () {
    register_rest_route('arefin/v1', '/contact', array(
        'methods' => 'POST', 'permission_callback' => '__return_true',
        'callback' => function (WP_REST_Request $r) {
            if (trim((string) $r->get_param('website')) !== '') return new WP_REST_Response(array('ok' => true), 200); // bot
            $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'x';
            $key = 'arefin_rl_' . md5($ip);
            $n = (int) get_transient($key);
            if ($n >= 5) return new WP_REST_Response(array('ok' => false, 'error' => 'too_many'), 429);
            set_transient($key, $n + 1, HOUR_IN_SECONDS);
            $name = sanitize_text_field((string) $r->get_param('name'));
            $email = sanitize_email((string) $r->get_param('email'));
            $phone = sanitize_text_field((string) $r->get_param('phone'));
            $concern = sanitize_text_field((string) $r->get_param('concern'));
            $msg = sanitize_textarea_field((string) $r->get_param('message'));
            if ($name === '' || mb_strlen($name) > 100 || !is_email($email) || strlen($email) > 255
                || mb_strlen($phone) < 6 || mb_strlen($phone) > 20 || $concern === '' || mb_strlen($concern) > 100 || mb_strlen($msg) > 1000) {
                return new WP_REST_Response(array('ok' => false, 'error' => 'invalid'), 400);
            }
            $body = "Name: $name\nEmail: $email\nPhone: $phone\nMedical concern: $concern\n\nMessage:\n$msg\n";
            $id = wp_insert_post(array('post_type' => 'arefin_request', 'post_status' => 'private',
                'post_title' => "$name — $concern", 'post_content' => $body));
            // HTML emails copied from the main site's Elementor form (team + patient).
            $hN = esc_html($name); $hE = esc_html($email); $aE = esc_attr($email); $hP = esc_html($phone);
            $hC = esc_html($concern); $hM = $msg === '' ? '—' : nl2br(esc_html($msg));
            $td = 'padding: 10px; border: 1px solid #dcdcdc;'; $th = $td . ' font-weight: bold; background-color: #ffffff;';
            $team = '<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0b1f3a; max-width: 600px; padding: 20px; border: 2px solid #0b3c6f; border-radius: 10px; background-color: #f4f8fc; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">'
              . '<h2 style="color: #0b3c6f; border-bottom: 3px solid #1f6fb2; padding-bottom: 10px; margin-top: 0; font-size: 22px;">🔔 NEW PATIENT INQUIRY: Dr. Arefin Consultation 🔔</h2>'
              . '<p style="font-size: 16px;">A new patient inquiry has been received. Please review the details below and arrange timely follow-up for consultation scheduling.</p>'
              . '<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 15px;">'
              . '<tr><td colspan="2" style="background-color: #0b3c6f; color: #ffffff; padding: 12px; font-weight: bold; border: 1px solid #0b3c6f;">PATIENT DETAILS FOR REVIEW</td></tr>'
              . '<tr><td style="width: 35%; ' . $th . '">Full Name:</td><td style="width: 65%; ' . $td . '">' . $hN . '</td></tr>'
              . '<tr><td style="' . $th . '">Concern / Service Requested:</td><td style="' . $td . ' font-weight: bold; color: #0b1f3a;">' . $hC . '</td></tr>'
              . '<tr><td style="' . $th . '">Email Address:</td><td style="' . $td . '"><a href="mailto:' . $aE . '" style="color: #0b3c6f;">' . $hE . '</a></td></tr>'
              . '<tr><td style="' . $th . '">Phone Number:</td><td style="' . $td . '">' . $hP . '</td></tr>'
              . '<tr><td style="' . $th . '">Patient Message:</td><td style="' . $td . '">' . $hM . '</td></tr></table>'
              . '<p style="font-size: 16px; font-weight: bold; color: #0b1f3a; margin-top: 20px;">Follow-up Action: <span style="color: #0b3c6f;">Contact ' . $hP . ' to schedule consultation or provide medical guidance.</span></p>'
              . '<p style="font-size: 14px; color: #777; margin-top: 25px;">Generated from Dr. Murshidul Arefin’s Official Website Contact Form (Dhaka, Bangladesh).</p></div>';
            $lk = 'margin: 0 8px; text-decoration: none; color: #1f5f8b; font-weight: bold;';
            $pat = '<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0b2c4d; max-width: 600px; margin: auto; padding: 25px; border: 2px solid #1f5f8b; border-radius: 12px; background-color: #ffffff; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);">'
              . '<h3 style="color: #0b2c4d; border-bottom: 3px solid #1f5f8b; padding-bottom: 15px; margin-top: 0; font-size: 20px;">Hello ' . $hN . ',</h3>'
              . '<p style="font-size: 16px;">Thank you for contacting <strong>Dr. Murshidul Arefin</strong>. Your medical consultation request has been successfully received.</p>'
              . '<p style="font-size: 16px;">We confirm your inquiry regarding: <strong>' . $hC . '</strong>.</p>'
              . '<div style="background-color: #1f5f8b; color: #ffffff; padding: 20px; border-radius: 8px; margin: 30px 0;"><h4 style="margin-top: 0; font-size: 18px; color: #ffffff;">✅ What Happens Next?</h4>'
              . '<ul style="padding-left: 20px; list-style: disc;"><li style="margin-bottom: 10px; font-weight: bold;">Our medical support team is reviewing your request.</li>'
              . '<li style="font-weight: bold;">We will contact you at <span style="color: #ffd166;">' . $hP . '</span> within the next few business hours to confirm your appointment details.</li></ul></div>'
              . '<p style="font-size: 16px; color: #0b2c4d;">If your matter is urgent or you need immediate assistance, please contact us directly:</p>'
              . '<div style="background-color: #f4f8fc; padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0; border: 2px solid #1f5f8b;">'
              . '<p style="font-size: 18px; margin: 10px 0; font-weight: bold; color: #0b2c4d;">📞 Serial (Appointment Line)</p><p style="font-size: 24px; font-weight: bold; margin: 5px 0;"><a href="tel:01311487592" style="color: #1f5f8b; text-decoration: none;">01311487592</a></p>'
              . '<p style="font-size: 18px; margin: 15px 0 10px 0; font-weight: bold; color: #0b2c4d;">💬 Direct WhatsApp</p><p style="font-size: 24px; font-weight: bold; margin: 5px 0;"><a href="https://wa.me/8801723134282" target="_blank" style="color: #1f5f8b; text-decoration: none;">01723134282</a></p>'
              . '<p style="font-size: 14px; color: #666; margin-top: 15px;">📧 <a href="mailto:arefin-info@drarefin.com" style="color: #1f5f8b; text-decoration: none;">arefin-info@drarefin.com</a></p></div>'
              . '<div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #d4d4d4;"><p style="font-size: 14px; color: #666; margin-bottom: 15px;">Stay informed with our latest health updates:</p>'
              . '<p><a href="https://drarefin.com/articles/" style="' . $lk . '">Medical News</a> | <a href="https://drarefin.com/treatment/" style="' . $lk . '">Treatments</a> | <a href="https://drarefin.com/contact/" style="' . $lk . '">Contact</a></p>'
              . '<p style="font-size: 16px; font-weight: bold; margin-top: 20px; color: #0b2c4d;">Dr. Murshidul Arefin’s Team<br><em>Dhanmondi, Dhaka, Bangladesh</em></p></div></div>';
            $html = 'Content-Type: text/html; charset=UTF-8';
            $sent = wp_mail('arefin-leads@googlegroups.com', "New Lead: $concern Inquiry from $name (Dr Arefin)", $team,
                array($html, 'From: Dr Arefin Appointment <info@drarefin.com>', "Reply-To: $name <$email>"));
            wp_mail($email, "Consultation Request Received! Next Steps for Your $concern Appointment with Dr. Arefin", $pat,
                array($html, 'From: Dr Arefin Appointment Booking <info@drarefin.com>', 'Reply-To: info@drarefin.com'));
            if ($id && !is_wp_error($id)) update_post_meta($id, 'arefin_mail_sent', $sent ? '1' : '0');
            return new WP_REST_Response(array('ok' => true, 'saved' => (bool) $id, 'mailed' => (bool) $sent), 200);
        },
    ));
});
`;

const list = await wp("/code-snippets/v1/snippets");
const existing = list.find((s) => s.name === NAME);
const body = JSON.stringify({ name: NAME, code: CODE.trim(), scope: "global", active: true,
  desc: "Serves Lovable-built pages stored in arefin_raw_html. Deactivate to restore Elementor pages." });
const saved = existing
  ? await wp(`/code-snippets/v1/snippets/${existing.id}`, { method: "POST", body })
  : await wp("/code-snippets/v1/snippets", { method: "POST", body });
console.log(`snippet ${saved.id} "${saved.name}" active=${saved.active}`);
