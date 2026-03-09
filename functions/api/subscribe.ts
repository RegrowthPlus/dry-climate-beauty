/**
 * Cloudflare Pages Function — newsletter subscription endpoint.
 * Validates email format and returns JSON response.
 * No actual email service integration yet — placeholder for future provider.
 */

interface Env {}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction<Env> = async ({ request }) => {
  try {
    const body = await request.json() as { email?: string };
    const email = body.email?.trim();

    if (!email) {
      return jsonResponse({ success: false, error: 'Email is required.' }, 400);
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return jsonResponse({ success: false, error: 'Please enter a valid email address.' }, 400);
    }

    // TODO: Integrate with email service provider (e.g., Mailchimp, ConvertKit, Resend)
    // For now, accept the subscription and return success.

    return jsonResponse({
      success: true,
      message: 'Thanks for subscribing! Check your inbox to confirm.',
    });
  } catch {
    return jsonResponse({ success: false, error: 'Invalid request.' }, 400);
  }
};
