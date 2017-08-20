/**
 * Created by Omkareshwar on 8/16/17.
 */

export function sendEmail (to, subject, body) {

  const apiKey = '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';

  return fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "personalizations": [{"to": [{"email": to}]}],
      "from": {"email": "info@mobilecommunityclassroom.com"},
      "subject": subject,
      "content": [{"type": "text/plain", "value": body}]
    })
  });
}