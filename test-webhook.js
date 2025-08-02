// Quick test to verify the webhook is working
const webhookUrl = 'https://hook.eu2.make.com/qxdaclexw4gvu4gh92lxla4tcbzpqt88';

const testPayload = {
  test: true,
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test webhook submission',
  source: 'webhook-test',
  timestamp: new Date().toISOString(),
  page: '/test',
  userAgent: 'Node.js Test',
  referrer: 'direct'
};

console.log('🧪 Testing webhook with payload:', testPayload);

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify(testPayload),
})
.then(response => {
  console.log('📥 Response Status:', response.status);
  console.log('📥 Response OK:', response.ok);
  return response.text();
})
.then(data => {
  console.log('✅ Response Data:', data);
  console.log('🎉 Webhook test completed successfully!');
})
.catch(error => {
  console.error('❌ Webhook test failed:', error);
});