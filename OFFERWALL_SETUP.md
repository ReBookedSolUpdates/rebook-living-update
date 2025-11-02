# Offerwall Integration Setup Guide

## Overview
The offerwall system allows users to complete offers/tasks to earn credits and unlock premium features like AI insights. Users are redirected to an external offerwall hosted on a subdomain.

## Architecture
1. User clicks "Unlock AI Insights" button
2. App redirects to `/ad` route
3. Ad page redirects to external offerwall: `https://living.rebookedsolutions.co.za/wall`
4. User completes offers on the offerwall
5. Offerwall provider sends callback to your webhook
6. Backend processes the reward and credits the user
7. User is redirected back to the original page with unlocked content

## Setup Checklist

### 1. Domain & Subdomain Setup
- [ ] Set up subdomain `living.rebookedsolutions.co.za` through your hosting/DNS provider
- [ ] Ensure HTTPS is active on both main domain and subdomain
- [ ] Create `/wall` route on the subdomain to host offerwall content

### 2. Offerwall Provider Configuration
Choose an offerwall provider (AdGem, IronSource, Tapjoy, etc.) and:
- [ ] Sign up for an account with your chosen provider
- [ ] Whitelist your domains in the provider dashboard:
  - `rebookedsolutions.co.za`
  - `living.rebookedsolutions.co.za`
- [ ] Configure the callback/postback URL:
  ```
  https://gzihagvdpdjcoyjpvyvs.supabase.co/functions/v1/offerwall-callback
  ```
- [ ] Get your provider's API credentials (keys, secrets)
- [ ] Get the signature verification details from your provider

### 3. Embed Offerwall on Subdomain
On `living.rebookedsolutions.co.za/wall`, embed the offerwall provider's iframe or widget:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Unlock Premium Content</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { margin: 0; padding: 0; overflow: hidden; }
    iframe { width: 100vw; height: 100vh; border: none; }
  </style>
</head>
<body>
  <script>
    // Extract user_id and return URL from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');
    const returnUrl = urlParams.get('return');
    
    // Store return URL for later redirect
    if (returnUrl) {
      sessionStorage.setItem('returnUrl', returnUrl);
    }
    
    // Insert your offerwall provider's embed code here
    // Make sure to include the userId in the offerwall initialization
  </script>
  
  <!-- Example: Replace with your provider's embed code -->
  <iframe 
    src="YOUR_OFFERWALL_PROVIDER_URL?user_id=${userId}" 
    id="offerwall-frame"
  ></iframe>
  
  <script>
    // Listen for completion events from offerwall
    window.addEventListener('message', function(event) {
      // Verify origin if needed
      if (event.data.type === 'offer_completed') {
        // Redirect back to return URL
        const returnUrl = sessionStorage.getItem('returnUrl');
        if (returnUrl) {
          window.location.href = returnUrl + (returnUrl.includes('?') ? '&' : '?') + 'ai=1';
        }
      }
    });
  </script>
</body>
</html>
```

### 4. Backend Webhook Security
The callback endpoint is already created, but you need to implement signature verification:

1. Edit `supabase/functions/offerwall-callback/index.ts`
2. Find the TODO comment for signature verification
3. Implement verification based on your provider's documentation

Example for common providers:
```typescript
// Example: AdGem signature verification
function verifyAdGemSignature(payload: any, signature: string, secretKey: string): boolean {
  const crypto = await import('https://deno.land/std@0.168.0/crypto/mod.ts');
  const data = `${payload.user_id}${payload.offer_id}${payload.reward_amount}${secretKey}`;
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash === signature;
}

// In the callback handler, before processing:
const isValid = verifyAdGemSignature(payload, payload.signature, PROVIDER_SECRET_KEY);
if (!isValid) {
  return new Response(
    JSON.stringify({ error: 'Invalid signature' }),
    { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

### 5. Testing
Test the complete flow:
- [ ] Click unlock button → redirects to offerwall
- [ ] Offerwall displays correctly with user_id parameter
- [ ] Complete a test offer
- [ ] Verify callback is received (check Supabase logs)
- [ ] Verify user credits are updated in database
- [ ] Verify user is redirected back with unlocked content

### 6. Monitoring & Logging
Monitor the system health:
- Check edge function logs: [View Logs](https://supabase.com/dashboard/project/gzihagvdpdjcoyjpvyvs/functions/offerwall-callback/logs)
- Query completion records:
  ```sql
  SELECT * FROM offerwall_completions ORDER BY created_at DESC LIMIT 10;
  ```
- Monitor user credits:
  ```sql
  SELECT id, email, credits FROM profiles WHERE credits > 0 ORDER BY credits DESC;
  ```

## Database Schema

### offerwall_completions
Tracks all completed offers:
- `id`: UUID primary key
- `user_id`: Reference to user
- `offer_id`: Identifier from offerwall provider
- `reward_amount`: Credits earned
- `currency`: Type of reward (default: 'credits')
- `provider`: Offerwall provider name
- `raw_payload`: Full callback data (for debugging)
- `completed_at`: Timestamp of completion

### profiles.credits
Added column to track user credits:
- `credits`: Integer, default 0
- Updated via `increment_user_credits()` function

## Usage in Your App

Check if user has unlocked content:
```typescript
// In your component
const params = new URLSearchParams(location.search);
const hasUnlocked = params.get('ai') === '1';

if (hasUnlocked) {
  // Show AI insights or premium content
} else {
  // Show button to unlock via offerwall
  <Button onClick={() => navigate(`/ad?return=${encodeURIComponent(location.pathname + location.search)}`)}>
    Unlock AI Insights
  </Button>
}
```

## Security Considerations
- ✅ Callback endpoint does not require JWT (external provider can call it)
- ✅ RLS policies prevent users from viewing other users' completions
- ✅ Credits update function is SECURITY DEFINER (safe)
- ⚠️ **MUST implement signature verification** to prevent fraud
- ⚠️ Validate all callback data before processing
- ⚠️ Rate limit the callback endpoint if needed

## Troubleshooting

### Offerwall not loading
- Check DNS propagation for subdomain
- Verify HTTPS is active
- Check browser console for CORS errors
- Verify domains are whitelisted with provider

### Callback not received
- Check provider dashboard for failed callbacks
- Verify callback URL is correct
- Check Supabase function logs for errors
- Ensure callback endpoint is publicly accessible

### Credits not updating
- Check function logs for errors
- Verify user_id in callback matches database
- Check if signature verification is failing
- Query offerwall_completions table for records

## Support
For issues or questions:
1. Check Supabase function logs
2. Review provider documentation
3. Contact your offerwall provider support
4. Review the callback payload structure

## Next Steps
After setup:
1. Add UI to display user credits in profile
2. Implement credit redemption logic
3. Add analytics tracking for conversions
4. Set up email notifications for rewards
5. Create admin dashboard to monitor offerwall performance
